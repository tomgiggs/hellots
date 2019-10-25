'use strict';
import * as log from 'pomelo-logger';
const logger: log.Logger = log.getLogger("match");
import * as lodash from "lodash";
import * as async from "async";
import * as utils from "../../util/utils";
import * as utilEx from "../../util/utilEx";
import { enums, routeDef,ec, consts,_} from "../../util/global";

import * as Redis from 'connect-redis/node_modules/redis';
import { time } from 'typings/pomelo';
import { use } from 'typings/bearcat';
const BASESERVER: DbType = require('../../../config/baseServer.json');
const REDIS: DbType = require('../../../config/redis.json');

let redisConnect = BASESERVER.cache.redis;
let redisCfg = REDIS.cache.matchRedis;
let prefixCfg: DbPrefix = REDIS.cache.prefix;
_.extend(redisConnect, redisCfg);

/**
 * 匹配流程逻辑是这样的：用户找与自己实力最相近的人（玩家积分与最近连胜常数），用户在队列中的排名=用户入队列时间，使用有序队列存的话方便从队列中删除元素及保存入队时间，不同段位的玩家在不同的队列中排队，
 * 超时的用户会被移动到优先级队列，目前是1个竞技场等级公用一个优先级队列，优先级队列理论上是不会有超过两个用户的，匹配从优先级队列开始，取出所有优先级队列的用户，
 * 同时取出普通队列的1000个用户（这个数量无法准确估算，可以调大一些，但是如果队列有几万个用户的话排在后面的用户只能等下一次时间片过来），或者一直取这个队列的用户
 * 直到用户数少于每批数量然后换一个队列处理，这里有一个极端情况是如果在取出来一批处理完后，队列又填进超过每批大小的用户，那么下一个队列将一直无法进行调度。
 * 
 */
export class MatchMaker{
    redisClient:Redis.createClient = null;
    batchSize:number = 100;
    timeout = 300*1000;//等待超时时间
    public constructor(){
        this.redisClient = Redis.createClient(redisConnect);
        this.redisClient.selected_db = redisCfg.db;
        this.redisClient.on('error', (err) => {
            let errorMessage: string = (err) ? err.toString() : "";
            logger.error('redis error: ' + errorMessage);
        });
    }

    public match(){
        setInterval(()=>{
            logger.info("开始新一轮玩家撮合");
            this.redisClient.hgetall(prefixCfg.match.arenaLevelConfig,(err, games)=>{//games是一个map结构（json）
                if(!!err||!games){
                    logger.error("get gameLevelConfig from redis failed:",err);
                    games = {}//避免后面报错
                }
                for(let appId of  Object.keys(games)){//获取每个游戏
                    //使用分布式锁来控制调度，避免同一个队列同时被两个媒人调度
                    for(let level=0;level<games[appId];level++){//处理每个段位的匹配
                        let lockKey:string = appId+":"+level;
                        this.redisClient.hsetnx(prefixCfg.match.schedulingQueue,lockKey,1,(err,isLock)=>{//setnx在设置成功时返回1代表获得锁成功（键不存在时才会成功），失败返回0。
                            if(isLock==1){
                                let matchKey:string = prefixCfg.match.seek_competitor +appId+ ":"+level+":";
                                async.auto({
                                    getPriortyQueue:(cb)=>{
                                        this.redisClient.lpop(matchKey,(err, users)=>{//优先级队列使用简单队列，简化操作
                                            if(!!err){
                                                logger.error("get gameLevelConfig from redis failed:",err);
                                                users = []//避免后面报错
                                            }
                                            // waitingUsers = users;
                                            cb(null,users)
                                        });                                            
                                    },
                                    getOrdinaryLoser:["getPriortyQueue",(cb,res)=>{
                                        let curTimestamp:number = new Date().getTime();
                                        this.redisClient.zrangebyscore(matchKey+"0",0, curTimestamp,(err, users)=>{//users是一个数组
                                            if(!!err){
                                                logger.error("getOrdinaryLoser failed:",err);
                                                users = []//避免后面报错
                                            }
                                            this.postMatch(res,users,matchKey+"0",(err,data)=>{
                                                if(err){
                                                    logger.error("getOrdinaryWinner error:",err);
                                                    data = []
                                                }
                                                cb(null,data);
                                            });
                                        });                                            
                                    }],
                                    getOrdinaryWinner:["getOrdinaryLoser",(cb,res)=>{
                                        let curTimestamp:number = new Date().getTime();
                                        this.redisClient.zrangebyscore(matchKey+"2",0, curTimestamp,(err, users)=>{
                                            if(!!err){
                                                logger.error("getOrdinaryWinner failed:",err);
                                                users = []//避免后面报错
                                            }
                                            this.postMatch(res,users,matchKey+"2",(err,data)=>{
                                                if(err){
                                                    logger.error("getOrdinaryWinner error:",err);
                                                    data = []
                                                }
                                                cb(null,data);
                                            });
                                            
                                        });                                            
                                    }],
                                    getOrdinaryWobbler:["getOrdinaryWinner",(cb,res)=>{
                                        let curTimestamp:number = new Date().getTime();
                                        this.redisClient.zrangebyscore(matchKey+"1",0, curTimestamp,(err, users)=>{
                                            if(!!err){
                                                logger.error("get gameLevelConfig from redis failed:",err);
                                                users = []//避免后面报错
                                            }
                                            this.postMatch(res,users,matchKey+"1",(err,data)=>{
                                                if(err){
                                                    logger.error("getOrdinaryWinner error:",err);
                                                    data = []
                                                }

                                                if(data.length>0){
                                                    //最后一个放到优先级队列里面
                                                    this.move(matchKey+"2",matchKey,data,(err,res)=>{
                                                        cb(null,null);
                                                    });                                                        
                                                }
                                            });
                                        });
                                    }]
                                },(err,result)=>{
                                    //调度结束后删除分布式锁
                                    this.redisClient.hdel(prefixCfg.match.schedulingQueue,lockKey,(err,deleted)=>{
                                        if(!!err){
                                            logger.error("delete distr lock error:",err);
                                        }
                                    })                                        
                                })
                            }
                        })
                    }
                }
            })
        },5000)
    }

    public postMatch(timeOutUsers,users,matchKey,cb){
        let infos:Array<string> = matchKey.split(":");
        let prefix = ":"+infos[3]+infos[4];
        let route:string = routeDef.REMOTE_FUN.MESSAGE_REMOTE_PUSHMESSAGETOUSER;
        const rnd:number = utils.getRandom(1, 10000);
        let mergedUsers = timeOutUsers.concat(users);
        let waitingUser = null;
                                                
        let pairs:number =Math.floor( mergedUsers.length/2);
        let userPairs = [];
        for(let i=0;i<pairs*2;i+=2){
            let params:any = [mergedUsers[i],mergedUsers[i+1]]
            userPairs.push(params);
        }
        if(mergedUsers.length !== pairs*2){
            waitingUser = mergedUsers[pairs*2];
        }

        async.mapSeries(userPairs,(params:Array<string>,cbFunc)=>{
            async.auto({
                //发送匹配结果
                sendMsg01:(cb,res)=>{
                    let message = {
                        userId:params[0],
                        title:"findPlayer",
                        content:{
                            other:params[1],
                            imageId:[],
                            targetId:[]
                        }
                    }
                    // utilEx.rpcServer(rnd, enums.SERVER_TYPE.MESSAGE, route, message, (err, data) => {
                    //     if (!!err) {
                    //         logger.error("send match result error:",err)
                    //     }
                    //     if (!!data.code && data.code !== ec.OK) {
                    //         logger.info(data)
                    //         return;
                    //     }
                    // })                                                             
                },
                sendMsg02:(cb,res)=>{
                    let message = {
                        userId:params[1],
                        title:"findPlayer",
                        content:{
                            other:params[0],
                            imageId:[],
                            targetId:[]
                        }
                    }
                    // utilEx.rpcServer(rnd, enums.SERVER_TYPE.MESSAGE, route, message, (err, data) => {
                    //     if (!!err) {
                    //         logger.error("send match result error:",err)
                    //     }
                    //     if (!!data.code && data.code !== ec.OK) {
                    //         logger.info(data)
                    //         return;
                    //     }
                    // })                                                             
                },

                deleteFromWaiting:(cb,res)=>{
                    //从匹配队列中删除掉用户
                    this.redisClient.zrem(matchKey,params,(err, data)=>{
                        if(!!err){
                            logger.error("remove role from queue failed:",err);
                        }
                        cb(null,null);
                    })
                },
            },(err,res)=>{
                if(err){
                    logger.error("schedule error:",err);
                }
                cbFunc(err,res);
            })                                                        
        },(err02,res02)=>{
            if(err02){
                logger.error("postmatch error:",err02);
            }
            this.isTimeOut(matchKey,waitingUser,(err,res)=>{
                if(err){
                    cb(err,null);
                    return;
                }
                if(!res){
                    cb(null,[]);
                    return;
                }
                cb(null,[waitingUser]);
            });   
        })
    }


    //移动等待时间太长的用户到优先级队列，函数(err,res)中res是具体的用户，null表示用户
    public move(oldQueue,priorityQueue,user,next){
        this.isTimeOut(oldQueue,user,(err,res)=>{
            if(!res){
                return;
            }
            async.auto({
                removeFromZSet:(cb)=>{
                    this.redisClient.zrem(oldQueue,user,(err, users)=>{//优先级队列使用简单队列，简化操作
                        if(!!err){
                            logger.error("removeFromZSet failed:",err);
                         }
                        cb(err,users)
                    });
                },
                addToPriorityQueue:(cb,res)=>{
                    this.redisClient.lpush(priorityQueue,user,(err, users)=>{//优先级队列使用简单队列，简化操作
                        if(!!err){
                            logger.error("addToPriorityQueue failed:",err);
                            users = []//避免后面报错
                        }
                        cb(err,users)
                    });                     
                }
            },(err,res)=>{
                if(err){
                    logger.error("move to priority queue failed:",err);
                }
                next(err,null);
            });
        })
    }
    //移动等待时间太长的用户到优先级队列，函数(err,res)中res是具体的用户，null表示用户
    public isTimeOut(oldQueue,user,next){
        this.redisClient.zscore(oldQueue,user,(err, score)=>{
            if(!!err){
                logger.error("get user score from redis failed:",err);
            }
            let curTimestamp:number = new Date().getTime();
            if(curTimestamp>(score+this.timeout)){
                next(null,true)
            }else{
                next(null,false);
            }
        });
    }
    
}
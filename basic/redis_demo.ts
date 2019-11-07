import * as redis from 'redis';
import {on} from "cluster";
let redisClient:redis.RedisClient= redis.createClient(6379,'192.168.9.130',{
    password:"Mm!Ou@S2e1R"
});
// redisClient.incrby('usercount',1,(err)=>{
//     console.log('incr usercount by 1');
//     console.log('good');
//
// });
// redisClient.lpush('login_queue','user01',function(err,result){
//     if(err){
//         console.log(err);
//     }else{
//         console.log('insert to queue result is :'+result);
//     }
//
// });
//
// redisClient.hgetall("gameLevelConfig",(err,data)=>{
//     console.log(data);
//     for(let key of  Object.keys(data)){
//         console.log(data[key])
//     }
// })

// redisClient.zrange("matchQueue",0,100,(err,data)=>{
//     console.log(data)
// })
// redisClient.zrem("matchQueue",["user01","user02"],(err,data)=>{
//     console.log(err,data)
// })
// redisClient.zrangebyscore("matchQueue",0,500,"withscores",(err,data)=>{
//     console.log(data)
// });
//

// redisClient.time((err,data)=>{
//     console.log(data)
// })


// redisClient.watch();
redisClient.multi([
    // ['time']
    ["lpush","multiDemo"," 22222"],
    // ['sadd multiSet 300 400']
]).exec((err,data)=>{
    console.log(err,data)
});






import * as redis from 'redis';
let redisClient = new redis.RedisClient({
    host:"",
    port:6379,

});
let pid = process.pid;
let next = null;




redisClient.setnx("kafkaConsumerRunning",pid.toString(),(err,data)=>{
    if(err){
        next(err,null);
    }else {
        next(null,data)
    }
});


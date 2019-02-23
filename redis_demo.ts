import * as redis from 'redis';
let redisClient:redis.RedisClient= redis.createClient(6379,'127.0.0.1');
redisClient.incrby('usercount',1,(err)=>{
    console.log('incr usercount by 1');
    console.log('good');

})
redisClient.lpush('login_queue','user01',function(err,result){
    if(err){
        console.log(err);
    }else{
        console.log('insert to queue result is :'+result);
    }

})






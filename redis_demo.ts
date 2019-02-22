import * as redis from 'redis';
let redisClient:redis.RedisClient= redis.createClient(6379,'127.0.0.1');
redisClient.incrby('usercount',1,(err)=>{
    console.log('incr usercount by 1');
    console.log('good');

})

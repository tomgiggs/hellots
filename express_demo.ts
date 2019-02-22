import * as express from 'express';
import * as redis from 'redis';
let app: any=express();
app.get('/', (req, res) => res.send('Hello World!'))

app.get('/count', function (req, res) {
    let redisClient:redis.RedisClient= redis.createClient(6379,'127.0.0.1');
    redisClient.incrby('usercount',1,(err)=>{
        console.log('incr usercount by 1');
        console.log('good');

    })
    redisClient.get('usercount',(err,num)=>{
        res.send('total usernum is :'+num);
    });
    
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))



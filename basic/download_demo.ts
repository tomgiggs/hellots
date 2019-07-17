import * as express from 'express';
import * as bodyParser from "body-parser";
import * as request from 'request';
import * as redis from 'redis';
import * as fs from 'fs';
import * as crypto from 'crypto'

let port = 9999;
let app: any=express();
app.use(bodyParser.urlencoded({ extended: true })); //这个用来解析接在URL上面的参数


//添加跨域支持
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,authorization");
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

// app.get('/', (req, res) => res.send('Hello World!'))
app.get('/', function (req, res) {
    res.sendFile( __dirname + "/" + "upload.html" );
})

app.get('/count', function (req, res) {
    let redisClient:redis.RedisClient= redis.createClient(6379,'127.0.0.1');
    redisClient.incrby('usercount',1,(err)=>{
        console.log('incr usercount by 1');
    })
    redisClient.get('usercount',(err,num)=>{
        res.send('total usernum is :'+num);
    });
});



app.get('/get_resources',bodyParser.json(), function (req, res) { //express.js有点不一样的就是很多事情都是要在post这个请求里面加函数
    try {
        console.log(req.query); //这个是用bodyparser.urlencoded获取的
        // console.log(req.params);
        // console.log(req.body);//只有这个可以获取到post过来的数据
        // console.log(req);
        let url = req.query.url
        let md5 = crypto.createHash('md5');
        let digest = md5.update(req.query.url).digest('hex');
        let suffixs = new Set(['.jpg','.png','.jpeg','.flv','.html','mp4'])
        let suffix = url.substring((url.lastIndexOf('.')));
        if(!suffixs.has(suffix)){
            suffix = ''
        }

        let filename = __dirname + '/cache/' + digest + suffix;
        if (fs.existsSync(filename)) {
            res.header('Content-Type', 'image/jpeg');
            res.sendFile(filename);
            return;
        } else {
            let result = request(url);
            result.pipe(fs.createWriteStream(filename));
            result.pipe(res);
            result.end();
        }
    }catch (e) {
        console.log(e);
        res.send({"success":false})
    }
});



app.listen(port, '0.0.0.0',() => console.log('Example app listening on port '+port))



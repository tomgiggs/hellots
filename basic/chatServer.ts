import * as express from 'express';
import * as bodyParser from "body-parser";
import * as request from 'request';
import * as redis from 'redis';
import * as fs from 'fs';
import * as multer from'multer';
import * as crypto from 'crypto'
import * as mqtt from "mqtt";
import * as mysql from 'mysql';

let mysqlClient:mysql.Connection = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'123',
    database:"vr_mmo"
});
mysqlClient.connect((err)=>{
    if(err){
        console.log(err)
    }
});
let client = mqtt.connect("http://192.168.249.128:1883",{
    username:'goood',
    password:'hahah'
})

let port = 9999;
let app: any=express();
app.use(bodyParser.urlencoded({ extended: true })); //这个用来解析接在URL上面的参数

let storage = multer.diskStorage({        // 设置multer参数，个性化指定上传目录和文件名
    destination: (req, file, cb) => {
        const uploadFloder = './upload';  // 保存上传文件的目录

        try {
            fs.accessSync(uploadFloder);
        } catch (error) {
            fs.mkdirSync(uploadFloder);
        }

        cb(null, uploadFloder);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

let upload = multer({
    storage: storage
});

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


app.post('/send_msg',bodyParser.json(), function(req, res, next) {
    var headers = req.headers;
    console.log(req.query); //这个是用bodyparser.urlencoded获取的
    console.log(req.params);
    console.log(req.body);//只有这个可以获取到post过来的数据
    client.publish('channel001/', 'Hello this is producer nodejs')
    res.send("ok")

});

app.post('/get_channel',bodyParser.json(), function(req, res, next) {
    var headers = req.headers;
    console.log(req.query); //这个是用bodyparser.urlencoded获取的
    console.log(req.params);
    console.log(req.body);//只有这个可以获取到post过来的数据
    client.publish('channel001/', 'Hello this is producer nodejs')
    res.send("ok")

});

app.listen(port, '0.0.0.0',() => console.log('Example app listening on port '+port))




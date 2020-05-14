import * as express from 'express';
import * as bodyParser from "body-parser";
import * as request from 'request';
import * as redis from 'redis';
import * as fs from 'fs';
import * as multer from'multer';
import * as crypto from 'crypto'
// let httpSess= request
import * as multiparty from 'multiparty'

let port = 9999;
let app: any=express();
app.use(bodyParser.urlencoded({ extended: true })); //这个用来解析接在URL上面的参数
const cacheDir = './cache/'
// app.use(bodyParser.arguments)

// let upload = multer({
//     dest:"./upload/"//这种方式会生成随机名称，要想控制上传的文件名称需要使用下面的方式来控制文件名
// });
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
    // console.log(req.header);
    // console.log(req.headers);
    // console.log(req.getHeader());
    // res.sendFile( __dirname + "/" + "upload.html" );
    res.send("hello world,this is express")
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

app.post('/upload', upload.any(), function(req, res, next) {
    let msg = {
        message:'File uploaded successfully',
        filename:req.files[0].originalname
    };
    res.send(msg)//这样就可以自动保存文件，但是怎么知道有没有保存成功？失败怎么怎么返回数据？
    // // console.log(req.files[0]);
    // var des_file = "./upload/" + req.files[0].originalname;
    // fs.readFile( req.files[0].path, function (err, data) {
    //     fs.writeFile(des_file, data, function (err) {
    //         if( err ){
    //             console.log( err );
    //         }else{
    //             let msg = {
    //                 message:'File uploaded successfully',
    //                 filename:req.files[0].originalname
    //             };
    //             res.send(msg)
    //         }
    //     });
    // });
});


app.post('/get_resources',bodyParser.json(), function (req, res) { //express.js有点不一样的就是很多事情都是要在post这个请求里面加函数
    var headers = req.headers;
    console.log(req.query); //这个是用bodyparser.urlencoded获取的
    console.log(req.params);
    console.log(req.body);//只有这个可以获取到post过来的数据
    // console.log(req);
    var URL = "http://cdn.lizhi.fm/radio_cover/2014/02/15/9524232787310084.jpg";
    var options = {
        url: req.body.url,
        method: "get",
        headers: {
            "Accept": "application/json"
        },
        json: true
    };
    get_resource(options,(err,result)=>{
        if(err){
            res.send("error happend");
            return;
        }
        res.send(result.body)
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

    // res.sendFile( __dirname + "/" + "test.jpg" );
    // get_resource(options,(err,result)=>{
    //     if(err){
    //         res.send("error happend");
    //         return;
    //     }
    //     res.writeHead(200, {'Content-Type': 'image/jpeg' });
    //     res.send(result.body)
    //     // res.writeHead(200, {'Content-Type': 'image/jpeg' }); //throw new Error('Can\'t set headers after they are sent.')报这个错误
    //     // res.header('Content-Type', 'image/jpeg');
    //     // res.header('content-type','image/jpg')
    //     // res.set('content-type: image/jpg')
    //     // res.type('jpg')
    //     res.setHeader('Content-Type','image/jpg')
    //     // res.set('Content-Type','image/jpg')
    // });
});


app.get('/upload_img',bodyParser.json(), function (req, res) { //express.js有点不一样的就是很多事情都是要在post这个请求里面加函数
    try {
        let url = req.query.url;
        let md5 = crypto.createHash('md5');
        let digest = md5.update(req.query.url).digest('hex');
        var form = new multiparty.Form();   
        form.uploadDir = './upload';  //上传图片保存的地址 目录必须存在   
        form.parse(req, function (err, fields, files) {
            console.log(fields);  // 获取表单的数据       
            console.log(files);  // 图片上传成功返回的信息       
            var title = fields.tit[0];       
            var con = fields.con[0];       
            var pic = files.pic[0].path;
 })



    }catch (e) {
        console.log(e);
        res.send({"success":false})
    }

});

app.get('/page_proxies',bodyParser.json(), function (req, res) { //express.js有点不一样的就是很多事情都是要在post这个请求里面加函数
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



function get_resource(options:any,cb:(err:any,resp:any)=>void) {

    request(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            // console.error("===============================平台返回信息", body);
            cb(error,response);
            return;
        }

    });
}

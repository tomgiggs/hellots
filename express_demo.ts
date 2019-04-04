import * as express from 'express';
import * as redis from 'redis';
import * as fs from 'fs';
import * as multer from'multer';

let port = 9999;
let app: any=express();
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
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
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

app.get('/testdata',function (req,res,next){
    res.send(JSON.stringify({"name":"python_demo","code":0,"data":[{'name': 'id'}, {'name': 'guid'}, {'name': 'productname'}, {'name': 'ownerid'}, {'name': 'ownername'}, {'name': 'resid'}, {'name': 'online'}, {'name': 'score'}, {'name': 'scorenumber'}, {'name': 'version'}, {'name': 'versioncode'}, {'name': 'screenshot'}, {'name': 'icon'}, {'name': 'releasetime'}, {'name': 'updatetime'}, {'name': 'createtime'}, {'name': 'category'}, {'name': 'flag'}, {'name': 'limit'}, {'name': 'privacy'}, {'name': 'price'}, {'name': 'baseid'}, {'name': 'statement'}, {'name': 'area'}, {'name': 'is_exp_protocol'}, {'name': 'base_version'}, {'name': 'grade'}, {'name': 'search_heat'}, {'name': 'pc'}, {'name': 'web'}, {'name': 'android'}, {'name': 'ios'}, {'name': 'wp'}, {'name': 'pc_edit'}, {'name': 'web_edit'}, {'name': 'android_edit'}, {'name': 'ios_edit'}, {'name': 'wp_edit'}, {'name': 'need_server'}, {'name': 'need_deploy'}, {'name': 'played_num'}]
    }))
})
app.listen(port, '0.0.0.0',() => console.log('Example app listening on port '+port))



import * as express from 'express';
import * as bodyParser from "body-parser";
import * as net from 'net';

let port = 9999;
let app: any=express();
app.use(bodyParser.urlencoded({ extended: true })); //这个用来解析接在URL上面的参数
let client:net.Socket = null;

function init_socket(){
    client = new net.Socket();
    client.connect(8972,'192.168.211.2');
    client.setEncoding('utf8');
    client.on('data',(chunk)=>{
        let data = new Buffer(chunk).toString("utf-8");
        console.log("msg from server:",data)
        return data
    });

    client.on('error',(e)=>{
        console.log(e.message);
    });
}
init_socket()
//添加跨域支持
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,authorization");
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.get('/', function (req, res) {
    res.send("hello world,this is express")
});

app.get('/http2tcp',bodyParser.json(), function (req, res) {
    try {
        console.log(req.query);
        let msg = req.query.msg;
        res.send(sendMsg(msg))

    }catch (e) {
        console.log(e);
        res.send({"success":false})
    }
});

function sendMsg(msg:string){

    client.write(new Buffer(msg));
    client.end()
    // setTimeout(()=>{
    //     client.destroy()
    //     console.log('client exit')
    // },1000)
}


app.listen(port, '0.0.0.0',() => console.log('Example app listening on port '+port))



import * as net from 'net';
import  * as util from "util";


let EventEmitter = require('events').EventEmitter;
let listener = function(){
    EventEmitter.call(this);
    this.server = null;

};

util.inherits(listener, EventEmitter);
listener.prototype.serve = function(){
    let server = net.createServer();
    server.on('connection',(socket)=>{
        socket.on('data',(data)=>{
            this.emit("getdata");
            console.log(data.toString());
        });

    });
    server.listen(9999);
    server.on('close',()=>{
        console.log('server exiting')
    });
};

module.exports.listener = listener;


module.exports.haha = function (msg,next) {
    console.log(msg)
    next()
};

//--------------------------------------
//client demo
// import * as net from 'net';
// import * as rl from 'readline';
//
// // let rl = readline.createInterface({
// //     input:process.stdin,
// //     output:process.stdout
// // });
//
//
// let client = new net.Socket();
//
// client.connect(9999,'localhost');
//
// client.setEncoding('utf8');
// client.on('data',(chunk)=>{
//
// })
// client.on('error',(e)=>{
//     console.log(e.message);
// })
//
//
// // rl.on('line',(mes)=>{
// //     client.write(mes);
// // })
//
// client.write(new Buffer("hello server22"));
//
// // client.end()
// // setTimeout(()=>{
// //     client.destroy()
// //     console.log('client exit')
// // },1000)




import * as cluster from 'cluster';
import * as net from 'net';
import * as subprocess from 'child_process';
import * as os from 'os';

let server:net.Server = net.createServer();
let workers:Array<any> = []
let cur:number= 0;
let cpunum:number = os.cpus().length;

for (let i = 0; i < cpunum; ++i) {
  workers.push(subprocess.fork('./worker.js'));
  console.log('Create worker-' + workers[i].pid);
}
// server.on('connection',(socket)=>{
//     console.log('new connection established');
//     // socket.push('hello,i am server');
//     socket.write('hello,i am server,i have read you msg');
//     socket.end('Request handled by worker-' + process.pid);
// })
server.on('connection', (socket) => {
    workers[cur].send('socket', socket);
    cur = (cur + 1) % cpunum;
  });

server.listen(9999,()=>{
    console.log('all worker startup,server listen on 9999');
});


//-----------------
// function work(){
process.on('message', (msg, socket) => {
    if (msg === 'socket' && socket) {
        // 利用setTimeout模拟处理请求时的操作耗时
        setTimeout(() => {
            console.log(msg);
            socket.write('hello,i am server,i have read you msg');
            socket.end('Request handled by worker-' + process.pid);
        }, 10)
    }
});
// }
// work()
// exports.worker = work;
// export {work};

//-----------------------------------------------------

function work(){
    process.on('message', (msg, socket) => {
        if (msg === 'socket' && socket) {
            // 利用setTimeout模拟处理请求时的操作耗时
            setTimeout(() => {
                socket.end('Request handled by worker-' + process.pid)
            }, 10)
        }
    });
}

// exports.worker = work; //这个导出是导出声明
// export {work};//这样写才能在其他文件里面到处文件，不然会报错导入的不是模块




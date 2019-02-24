
import * as cluster from 'cluster';
import * as net from 'net';
import * as subprocess from 'child_process';
import * as os from 'os';

let server:net.Server = net.createServer();
let workers:Array<any> = []
let cur:number= 0;
let cpunum:number = os.cpus().length;

for (let i = 0; i < 2; ++i) {
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








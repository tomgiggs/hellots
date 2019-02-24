
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

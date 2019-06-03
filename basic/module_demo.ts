
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

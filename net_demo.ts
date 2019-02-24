import * as net from 'net';

net.createConnection({
    port: 9999,
    host: '127.0.0.1'
  }).on('data', (data) => {
    console.log(data.toString())
  });




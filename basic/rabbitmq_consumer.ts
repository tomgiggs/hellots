import * as amqp from 'amqplib';

//consumer
amqp.connect({
    hostname:"127.0.0.1",
    username:'admin',
    password:"admin"
}).then(function(conn) {
    process.once('SIGINT', function() { conn.close(); });
    return conn.createChannel().then(function(ch) {

        let ok = ch.assertQueue('hello', {durable: false});

        let result = ok.then(function(_qok) {
            return ch.consume('hello', function(msg) {
                console.log(" [x] Received '%s'", msg.content.toString());
            }, {noAck: true});
        });

        return result.then(function(_consumeOk) {
            console.log(' [*] Waiting for messages. To exit press CTRL+C');
        });
    });
}).catch(console.warn);
//producer
// var amqp = require('amqplib');
//
// amqp.connect('amqp://ubuntu:ubuntu@127.0.0.1').then(function(conn) {
//     return conn.createChannel().then(function(ch) {
//         var q = 'hello';
//         var msg = 'zzk Hello World!';
//
//         var ok = ch.assertQueue(q, {durable: false});
//
//         return ok.then(function(_qok) {
//             // NB: `sentToQueue` and `publish` both return a boolean
//             // indicating whether it's OK to send again straight away, or
//             // (when `false`) that you should wait for the event `'drain'`
//             // to fire before writing again. We're just doing the one write,
//             // so we'll ignore it.
//             ch.sendToQueue(q, Buffer.from(msg));
//             console.log(" [x] Sent zzk'%s'", msg);
//             return ch.close();
//         });
//     }).finally(function() { conn.close(); });
// }).catch(console.warn);

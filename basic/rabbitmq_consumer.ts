import * as  amqp from 'amqplib';

amqp.connect({
    hostname:"rabbitmq-tncj.edbox-beta-cn.101.com",
    username:'admin',
    password:"admin"
}).then(function(conn) {
    process.once('SIGINT', function() { conn.close(); });
    return conn.createChannel().then(function(ch) {

        let ok = ch.assertQueue('hello', {durable: false});

        ok = ok.then(function(_qok) {
            return ch.consume('hello', function(msg) {
                console.log(" [x] Received '%s'", msg.content.toString());
            }, {noAck: true});
        });

        return ok.then(function(_consumeOk) {
            console.log(' [*] Waiting for messages. To exit press CTRL+C');
        });
    });
}).catch(console.warn);

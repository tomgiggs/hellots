import * as mqtt from "mqtt";
import * as fs from 'fs';
let client = mqtt.connect("ws://mqtt.edbox-dev.101.com:8083/mqtt", {
    username: 'admin',
    password: 'public',
    rejectUnauthorized:false,
    });

function produce(){
    for (let i = 0; i < 200; i++) {
        client.on('connect', function () {
            client.publish('app2dev/', fs.readFileSync('msg.txt'))
        })
    }
    
    client.on('message', function (topic, message) {
        console.log(message.toString())
        client.end()
    })
}

function consume_dev() {

    client.on('connect', function () {
        client.subscribe('server/#');
    });
    client.on('message', function (topic, message) {
        console.log(message.toString());
        // client.end()
    });
}
consume_dev()
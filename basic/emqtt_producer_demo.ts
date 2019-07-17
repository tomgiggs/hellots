import * as mqtt from "mqtt";
import * as fs from 'fs';
let client = mqtt.connect("http://192.168.212.34:1883",{
    username:'admin',
    password:'public'
})

for (let i = 0; i < 200; i++) {
    client.on('connect', function () {
        client.publish('app2dev/', fs.readFileSync('msg.txt'))
    })
}

client.on('message', function (topic, message) {
    console.log(message.toString())
    client.end()
})

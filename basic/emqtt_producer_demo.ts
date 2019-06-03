import * as mqtt from "mqtt";

let client = mqtt.connect("http://192.168.254.128:1881",{
    username:'admin',
    password:'public'
})

for (let i = 0; i < 200; i++) {
    client.on('connect', function () {
        client.publish('app2dev/', 'Hello this is producer nodejs')
    })
}

client.on('message', function (topic, message) {
    console.log(message.toString())
    client.end()
})

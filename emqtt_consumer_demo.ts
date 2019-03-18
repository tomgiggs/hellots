import * as mqtt from "mqtt";

let client = mqtt.connect("http://192.168.254.128:1881",{
    username:'admin',
    password:'public'
})

client.on('connect', function () {
    client.subscribe('app2dev/')
})

client.on('message', function (topic, message) {
    console.log(message.toString())
    // client.end()
})


import * as mqtt from "mqtt";

let client = mqtt.connect("http://192.168.249.128:1883",{
    username:'edbox_client_inland',
    password:'kkclient2018.inland'
})


client.on('connect',  ()=> {
    client.subscribe('channel001/')
})

client.on('message', function (topic, message) {
    console.log(message.toString())
    // client.end()
})


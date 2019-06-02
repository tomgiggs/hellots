import * as mqtt from "mqtt";

let client = mqtt.connect("http://192.168.249.128:1883",{
    username:'edbox_client_inland',
    password:'kkclient2018.inland'
})



for (let i = 0; i < 200; i++) {
    client.on('connect',  ()=> {
        client.publish('channel001/', 'Hello this is producer nodejs')
    })
}

client.on('message', function (topic, message) {
    console.log(message.toString())
    client.end()
})

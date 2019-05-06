import * as kafka from "kafka-node"


// let client = new kafka.KafkaClient({
//     kafkaHost:'192.168.19.54:2181'
//     // kafkaHost:'192.168.19.224:9092'
// })

// var c1 = new kafka.ConsumerGroup(Object.assign({ id: 'c1' }, {
//     // host: '192.168.19.54:2181',
//     kafkaHost:'192.168.19.54:2181',
//     groupId: 'group-002',
//     sessionTimeout: 15000,
//     autoCommit: true,
// }), "canal_product_base_msg_004");
// c1.on('message', (msg)=>{
//     console.log(msg)
// });
// c1.on('error', (error => {
//     console.log(error)
// }));


// let producer = new kafka.Producer(client,{
//     requireAcks:1
// })

//这种方式老是出现连接不上Kafka的问题，在python连接没问题，一到node就老实一堆问题
let consumer = new kafka.ConsumerGroup({
    kafkaHost:'192.168.19.54:9092',
    groupId:"canal_consumer05",
    fromOffset:"earliest",
    autoCommit:false,
    maxNumSegments:100,
    fetchMaxBytes:100000,
    sessionTimeout:180000,

    fetchMaxWaitMs:100000,
    retryMinTimeout:120000,


},"canal_product_base_msg_004")
process.on('SIGINT', ()=> {
    consumer.close((error => {
        console.log(error)
    }))
    process.exit(0);

});
// process.on('SIGINT', function () {
//     consumer.close((error => {
//         console.log(error);
//     }));
//     process.exit(0);
// });

// let consumer = new kafka.Consumer(client,
//     [{topic:"bbq",offset:0}],
//     {
//         groupId:"test001",
//     autoCommit:true
// });
consumer.on('connect', () => {
    console.log('connected .....')
});
consumer.on('message',(msg)=>{
    console.log(msg);
    // parseMsg(msg.value.toString())
});

consumer.on('rebalancing', () => {
    console.log('rebalancing .....')
});

consumer.on('rebalanced', () => {
    console.log('rebalanced .....')
});

consumer.on('offsetOutOfRange', () => {
    console.log('offsetOutOfRange .....')
});


//
// function parseMsg(record:string) {
//     let recordObj:any = JSON.parse(record)
//     let messages:Array<any> =  recordObj.data;
//     let database:string = recordObj.database;
//     let table :string = recordObj.table;
//
//     for(let msg of messages){
//         try{
//             let es_data = {
//                 "doc":msg
//             }
//             console.log(es_data)
//
//         }catch(err) {
//
//         }
//     }
//
// }
// function  updateEsData(newRecord:any) {
//
//
// }



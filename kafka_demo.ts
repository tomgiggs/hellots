import * as kafka from "kafka-node"


let client = new kafka.KafkaClient({
    // kafkaHost:'192.168.254.130:9092'
    kafkaHost:'192.168.19.224:9092'
})
// let producer = new kafka.Producer(client,{
//     requireAcks:1
// })



let consumer = new kafka.ConsumerGroup({
    kafkaHost:'192.168.19.224:9092',
    groupId:"test001",
    fromOffset:"earliest",
    autoCommit:false,
    maxNumSegments:100,
    fetchMaxBytes:100000,
    sessionTimeout:180000,
},"bbq")



// let consumer = new kafka.Consumer(client,
//     [{topic:"bbq",offset:0}],
//     {
//
//         groupId:"test001",
//     autoCommit:true
// });
// consumer.on('message',(msg)=>{
//     console.log(msg);
//     // parseMsg(msg.value.toString())
// })
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



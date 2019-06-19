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

import * as loger from "log4js"
import {RetryOptions} from "kafka-node";

loger.configure({
    appenders: {
        service: {
            type: "console",
            filename: "mysql2es.log",
            layout: {
                type: "pattern",
                pattern: "%[[%d{ISO8601_WITH_TZ_OFFSET}] [%h] [%c] [%p] %] %m%n",
            },
            pattern: ".yyyy-MM-dd"
        }
    },
    categories: {
        default: {
            appenders: ["service"],
            level: "debug"
        }
    }
});

function consoleLoggerProvider (name) {
    // do something with the name
    return {
        debug: console.debug.bind(console),
        info: console.info.bind(console),
        warn: console.warn.bind(console),
        error: console.error.bind(console)
    };
}
const kafkaLogging = require('kafka-node/logging');
kafkaLogging.setLoggerProvider(consoleLoggerProvider);


class Test{
    consumer = new kafka.ConsumerGroup({
        kafkaHost:'192.168.19.4:9092',
        groupId:"canal_consumer05",
        fromOffset:"earliest",
        autoCommit:false,
        outOfRangeOffset:"earliest",
        maxNumSegments:100,
        fetchMaxBytes:100000,
        sessionTimeout:180000,

        fetchMaxWaitMs:100000,
        retryMinTimeout:120000,


    },"canal_msg_004");
    public test(){
        // this.consumer.client.refreshMetadata()
    }

    public  startx(){
        this.consumer.on('connect', () => {
            console.log('connected .....')
        });
        this.consumer.on('message',(msg)=>{
            console.log(msg);
            this.consumer.pause();
            this.consumer.commit(()=>{console.log('success')})

            // parseMsg(msg.value.toString())
        });

        this.consumer.on('rebalancing', () => {
            console.log('rebalancing .....')
        });

        this.consumer.on('rebalanced', () => {
            console.log('rebalanced .....')
        });

        this.consumer.on('offsetOutOfRange', () => {
            console.log('offsetOutOfRange .....')
        });
        this.consumer.close(true,(err)=>{
            console.log(err)
        })
    }


    // setInterval(()=>{
    //     consumer.resume();
    //
    // },1000)
    // consumer.pause();
    // consumer.resume();
}

// let xx = new Test();
// xx.startx()


class CustomedConsumer extends  kafka.KafkaClient {
}



try{
    let kafkaClient = new kafka.KafkaClient({
        kafkaHost: "192.168.19.54:9092",
        connectTimeout: 180000,
        requestTimeout: 180000,
        autoConnect: true,
    });

    let offsetReq = [{
        topic: "canal_msg_perfomance01",
        // partition: 1,
        // offset: 0
    }];

    let simpleConsumer = new kafka.Consumer(kafkaClient,offsetReq,{
        // groupId: "canal_consumer052",
        // autoCommit: false,
        fetchMaxBytes:100000,
        fetchMaxWaitMs:100000,
    });
    console.log('good');

    // consumer.client.on("ready",()=>{console.log('ready')})
    simpleConsumer.on("error",err=>{
        console.log(err);
    })

    simpleConsumer.on("message",msg=>{
        console.log(msg);
    })
    // simpleConsumer.client.on("ready",msg=>{
    //     console.log(msg);
    // });
    // simpleConsumer.client.on("connect",msg=>{
    //     console.log(msg);
    // })
    simpleConsumer.on("message",msg=>{
        console.log(msg);
    })
    // setInterval(()=>{if(consumer.client){
    //     console.log("ready")
    // }},1000)



}catch (e) {
    console.log(e)
}


// try{
//     let consumer = new kafka.ConsumerGroup({
//         // kafkaHost:'192.168.9.129:9092,192.168.9.129:9092',
//         kafkaHost:'192.168.19.54:9092',
//
//         groupId:"canal_consumer052",
//         fromOffset:"earliest",
//         autoCommit:false,
//         outOfRangeOffset:"earliest",
//         maxNumSegments:100,
//         fetchMaxBytes:100000,
//         sessionTimeout:180000,
//         fetchMaxWaitMs:100000,
//         retryMinTimeout:120000,
//         // requestTimeout: 300000,//超时时间设置得这么长了还是报超时错误，这个肯定是有问题的，这个参数是kafkaClient的参数，但是在GroupConsumer的index.d.ts参数里面没有
//
//     },"canal_msg_perfomance01");
//
//
//     console.log('good');
//     console.log(consumer.memberId);
//
//     // consumer.client.on("ready",()=>{console.log('ready')})
//     consumer.on("error",err=>{
//         console.log(err);
//     })
//
//     consumer.on("message",msg=>{
//         console.log(msg);
//     })
//
//     // setInterval(()=>{if(consumer.client){
//     //     console.log("ready")
//     // }},1000)
//
//
//
// }catch (e) {
//     console.log(e)
// }


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





// import * as os from 'os';
// console.log(os.type());
// console.log(os.platform());
// import * as fs from 'fs';
// import * as sequelize from 'sequelize';
import * as elasticsearch from 'elasticsearch'
let client = new elasticsearch.Client({
    // host: "http://localhost:9200",
    // host: ["192.168.254.130:9200","192.168.254.132:9200","192.168.254.134:9200"],
    host:['192.168.19.55'],
    log: 'debug',
    sniffOnStart:true,
    keepAlive:true,
    requestTimeout:180000,


})

client.ping({
    requestTimeout:30000

},(err,result,status)=>{
    console.log(err);
    console.log(result);
    console.log(status);
})

// for (let i = 0; i < 5000; i++) {

client.update({
    id:"b8a8e6d0-01eb-11e9-910b-d58021a6c605",
    index:"vr_mmo_product_act_info_01",
    type:"info",
    routing:null,
    body:{
        "doc":{
            "productid":"b8a8e6d0-01eb-11e9-910b-d58021a6c605",
            "productname":"炫酷跑酷游戏",
            "score":4
        }
    }

},(err,result)=>{
    console.log(err);
    console.log(result);

})
// }
// client.close();



//
// client.index({
//     id:"1",
//     index:"index_demo",
//     type:"lvl1",
//     body:{
//         "doc":{
//             "productid":"x000000001",
//             "resid":"resid00001",
//             "score":2000
//         }
//     }
//
// },(err,result)=>{
//     console.log(err);
//     console.log(result);
//
// })

// client.get({
//     id:"1",
//     index:"index_demo",
//     type:"lvl1"
// },(err,result)=>{
//     console.log(result)
// })
// client.create({
//     id: "2",
//     index: "index_demo",
//     type: "lvl1",
//     body: {
//         "productid":"x000000002",
//         "productname":"this is a product name demo",
//         "releasetime":201904171352,
//         "resid":"resid00002",
//         "score":100
//     }
//
// },(err,result)=>{
//     console.log(err);
//     console.log(result);
// })
// function packInfo(msg:any){
//     console.log(msg);
//     return msg;
// }
//
// function packTag(msg:any){
//     console.log(msg)
//     return msg;
// }
//
// let processor = {
//     "d_product_set":packInfo,
//     "d_product_tag":packTag,
// }
//
// processor['d_product_set']({
//     "keyword":"hahahahahahahaha"
// })
// processor.d_product_set({
//     "keyword":"hahahahahahahaha"
// })
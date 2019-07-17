

// import * as os from 'os';
// console.log(os.type());
// console.log(os.platform());
// import * as fs from 'fs';
// import * as sequelize from 'sequelize';
import * as elasticsearch from 'elasticsearch'
// let client = new elasticsearch.Client({
//     // host: "http://localhost:9200",
//     // host: ["192.168.254.130:9200","192.168.254.132:9200","192.168.254.134:9200"],
//     host:['192.168.9.129:9200'],
//     log: 'debug',
//     sniffOnStart:true,
//     keepAlive:true,
//     requestTimeout:180000,
// });
// client.close();
//
// client.ping({
//     requestTimeout:30000
//
// },(err,result,status)=>{
//     console.log(err);
//     console.log(result);
//     console.log(status);
// });

//-----------------------------------

let esMonitor = new elasticsearch.Client({
    host: "192.168.9.129:9200",
    requestTimeout:10000,
    // maxRetries:100,
    sniffOnStart: true,
    keepAlive: true,
    log:"debug",
});
setInterval(()=>{
    esMonitor.ping({
        requestTimeout:10000
    },(err,result,status)=>{
        console.log(err,result,status);
        // if (err ) {
        //     console.log(err,result,status);
        // }
        // if(!err && status==200){
        //     console.log(err,result,status);
        // }
    })
},1000);
//----------------------------

// for (let i = 0; i < 5000; i++) {

// client.create({
//     id:"c5eb8680-7dcf-11e9-bd90-653d234bf625",
//     index:"vr_mmo_product_base_info_development_20190522",
//     type:"info",
//     routing:null,
//     timeout:"30s",
//     refresh:false,
//     versionType: "internal",
//     body:{
//         "guid": "c5eb8680-7dcf-11e9-bd90-653d234bf625",
//         "productname": "zjl-es-test111",
//         "ownerid": 10000082,
//         "ownername": "庄杰良",
//     }
//
// },(err,result)=>{
//     console.log(err);
//     console.log(result);
//
// })
// client.update({
//     id:"b8a8e6d0-01eb-11e9-910b-d58021a6c605",
//     index:"vr_mmo_product_act_info_01",
//     type:"info",
//     routing:null,
//     body:{
//         "doc":{
//             "productid":"b8a8e6d0-01eb-11e9-910b-d58021a6c605",
//             "productname":"炫酷跑酷游戏",
//             "score":4
//         }
//     }
//
// },(err,result)=>{
//     console.log(err);
//     console.log(result);
//
// })



//http://192.168.19.55:9200/vr_mmo_product_base_info_qa_20190524/info/c5eb8680-7dcf-11e9-bd90-653d234bf625
// client.delete({
//     timeout:"30s",
//     refresh:true,
//     id:"222",
//     index:"index_name",
//     type:"index_type",
// },(err,result)=>{
//
// })


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
//
// client.search({
//     index: 'vr_mmo_product_base_info_qa_20190524',
//     type:'info',
//     body:{
//         "query": {
//             "bool": {
//                 "must": [
//                     {
//                         "prefix": {
//                             "productname": "切"
//                         }
//                     }
//                 ],
//                 "must_not": [],
//                 "should": []
//             }
//         },
//         "from": 0,
//         "size": 10,
//         "sort": [],
//         "aggs": {}
//
//     }
// }, function (error, response) {
//     if(error){
//         console.log(error)
//     }
//     console.log(response)
//     response.hits.hits.map((v)=>console.log(v))
// });




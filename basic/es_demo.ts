

// import * as os from 'os';
// console.log(os.type());
// console.log(os.platform());
// import * as fs from 'fs';
// import * as sequelize from 'sequelize';
import * as elasticsearch from 'elasticsearch'
let client = new elasticsearch.Client({
    // host: "http://localhost:9200",
    // host: ["192.168.254.130:9200","192.168.254.132:9200","192.168.254.134:9200"],
    host:['eshost.com:9200'],
    log: 'debug',
    sniffOnStart:true,
    keepAlive:true,
    requestTimeout:180000,
});


client.ping({
    requestTimeout:30000

},(err,result,status)=>{
    console.log(err);
    console.log(result);
    console.log(status);
})

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
//         "online": 0,
//         "score": 0,
//         "scorenumber": 0,
//         "version": "1.00",
//         "versioncode": 0,
//         "screenshot": "27eb58eb-9da1-43fe-ad73-159ab9bf2457",
//         "icon": "e09e5dff-8390-4c3a-b393-4d49dfeac805",
//         "releasetime": "20190524105814",
//         "updatetime": 20190524105814,
//         "createtime": 20190524105814,
//         "category": 0,
//         "flag": 0,
//         "limit": 10,
//         "privacy": 1,
//         "price": 0,
//         "baseid": "",
//         "statement": "",
//         "area": "cn",
//         "is_exp_protocol": "0",
//         "base_version": "",
//         "pc": 0,
//         "web": 1,
//         "android": 0,
//         "ios": 0,
//         "wp": 0,
//         "pc_edit": 0,
//         "web_edit": 0,
//         "android_edit": 0,
//         "ios_edit": 0,
//         "wp_edit": 0,
//         "need_server": 0,
//         "need_deploy": 1,
//         "productid": "c5eb8680-7dcf-11e9-bd90-653d234bf625",
//         "introduction": "111",
//         "game_tags": [],
//         "edu_tags": [],
//         "other_game_tags": [],
//         "other_edu_tags": [],
//         "customed_tags": "",
//         "customed_game_tags": "",
//         "customed_edu_tags": "",
//         "tag_codes": [],
//         "used_num": 0,
//         "likes": 0,
//         "id": "c5eb8680-7dcf-11e9-bd90-653d234bf625",
//         "resid": "",
//         "doc_url": "",
//         "doc_open": "0",
//         "web_pc_edit": 1
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

client.search({
    index: 'vr_mmo_product_base_info_qa_20190524',
    type:'info',
    body:{
        "query": {
            "bool": {
                "must": [
                    {
                        "prefix": {
                            "productname": "切"
                        }
                    }
                ],
                "must_not": [],
                "should": []
            }
        },
        "from": 0,
        "size": 10,
        "sort": [],
        "aggs": {}

    }
}, function (error, response) {
    if(error){
        console.log(error)
    }
    console.log(response)
    response.hits.hits.map((v)=>console.log(v))
});




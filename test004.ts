// import  config from "./loaderConfig"
// //import * as  config from "./loaderConfig" 与 import  config from "./loaderConfig" 这两个导入语句是不一样的，
// console.log(config.es_host)

// import * as elasticsearch from "elasticsearch"
//
// let client = new elasticsearch.Client({
//     host: '192.168.254.130:9200',
//     log: 'trace'
// });

// let es_data =
//
//             { id: '3188',
//                 guid: '088752b0-1fc7-11e9-b4b4-e316e2dfc24e',
//                 productname: 'mem111',
//                 ownerid: '254716',
//                 ownername: 'Creater',
//                 resid: '141684ea-d95e-4a3e-8c10-4e0fe661bccf',
//                 online: '0',
//                 score: '0.0',
//                 scorenumber: '0',
//                 version: '1.00',
//                 versioncode: '0',
//                 screenshot: '',
//                 icon: '',
//                 releasetime: '20190124185851',
//                 updatetime: '20190124185851',
//                 createtime: '20190124185851',
//
//                 played_num: '0' }

// let act_map={"id":"3188","guid":"088752b0-1fc7-11e9-b4b4-e316e2dfc24e","productname":"mem111","ownerid":"254716","ownername":"Creater","resid":"141684ea-d95e-4a3e-8c10-4e0fe661bccf","online":"0","score":"0.0","scorenumber":"0","version":"1.00","versioncode":"0","screenshot":"","icon":"","releasetime":"20190124185851","updatetime":"20190124185851","createtime":"20190124185851","played_num":"0"}
// let hmap:{[key:string]:any} ={}
// // hmap = JSON.parse(act_map);
// hmap=act_map;
//
// console.log(hmap['id'])
// hmap['gooooood'] = 300000
// console.log(JSON.stringify(hmap))

// console.log(JSON.stringify(es_data));

//     let ignored_keys = ['score','icon','online']
// for(let key of ignored_keys){
//     // console.log(key);
//     delete es_data[key]
//
// }
// console.log(es_data)
// es_data['newkey'] = '2000000'
// console.log(es_data);


// client.update({
//     index:"index_formal",
//     type:"xxx",
//     id:"Kkdb2GkBR3TKhsZHPZBi",
//     // _source:es_data//要更新的数据放哪里？？
//     // _source:JSON.stringify(es_data)
//
// },
//     (err,result)=>{
//     if(err){
//         console.log(err)
//     }else {
//         console.log(result)
//     }
// // client.close();
// })


// import * as request from "request"
//直接使用request post请求更新数据，使用elasticsearch包其实也是通过HTTP方式发起请求，只不过是封装了接口而已
// let host = "192.168.254.130:9200";
// let uri = '/index_formal/xxx/Kkdb2GkBR3TKhsZHPZBi/_update';
// let options = {
//     url: "http://" + host + uri,
//     method: "post",
//     headers: {
//         "Accept": "application/json",
//     },
//     json: true,
//     body: {
//         es_data
//     }
//
// };
// request(options, (error, response, body) => {
//     if (!error && response.statusCode === 200) {
//         console.error("===============================平台返回信息", body);
//         return;
//     }
//     console.error("=============error==================", error);
//     console.error("===============body================", body);
//     console.error("================status===============", response.statusCode);
// });
//
// import * as _ from 'loadsh'
// let a = {guid:20000,score:10}
// let b = {name:'goooood'}
// console.log(_.extend(b, a))


// import  * as request from 'request'
//
// function get_img_info(){
//     let URL = "http://192.168.19.55/api/repositories/edbox_feature/kafka/tags/1.0";
//     let options = {
//         url:  URL,
//         method: "get",
//         headers: {
//             "Accept": "application/json",
//             "authorization":""
//         },
//     };
//     request(options, (error, response, body) => {
//         if (!error && response.statusCode === 200) {
//             console.error("===============================平台返回信息", body);
//             return;
//         }
//         console.error("===============================error", error);
//         console.error("===============================body", body);
//         console.error("===============================status", response.statusCode);
//     });
// }
// import * as os from 'os'
//
// function getIPAdress() {
//     let localIPAddress = "";
//     let interfaces = os.networkInterfaces();
//     for (let devName in interfaces) {
//         let iface = interfaces[devName];
//         for (let i = 0; i < iface.length; i++) {
//             let alias = iface[i];
//             if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
//                 localIPAddress = alias.address;
//             }
//         }
//     }
//     console.log(localIPAddress);
//     return localIPAddress;
// }
//
// // getIPAdress()
//
// let newTimeStamp = new Date().getTime();
// let oldTimeStamp = Math.floor(newTimeStamp/1000-168*3600);
// let oldDate = new Date(oldTimeStamp*1000);
// let oldDateStr = "2019051002200100";
//
// let sql = "SELECT CONCAT_WS(\"_\",a.app_id,a.app_version,a.access_type,a.code_type,a.versioncode) AS imgid " +
//     "FROM (SELECT * FROM d_product_deploy WHERE STATUS !=0 AND access_type=3 and duration>\"+oldDateStr+\") a LEFT JOIN d_product_set b ON a.app_id=b.guid AND a.app_version=b.version WHERE b.version IS NULL OR b.flag =4   " +
//     "UNION SELECT CONCAT_WS(\"_\",a.app_id,a.app_version,a.access_type,a.code_type,a.versioncode) AS imgid " +
//     "FROM (SELECT * FROM d_product_deploy WHERE STATUS !=0 AND access_type=1 and duration>\"+oldDateStr+\") a LEFT JOIN d_product_base b ON a.app_id=b.guid AND a.app_version=b.version WHERE b.version IS NULL OR b.flag =4 " +
//     "UNION  SELECT CONCAT_WS(\"_\",a.app_id,a.app_version,a.access_type,a.code_type,a.versioncode) AS imgid " +
//     "FROM (SELECT * FROM d_product_deploy WHERE STATUS !=0 AND access_type=2 and duration>\"+oldDateStr+\") a LEFT JOIN d_personal_product b ON a.app_id=b.guid AND a.app_version=b.version WHERE b.version IS NULL OR b.flag =4"
//
// console.log(sql);

let ab = "ssss"
console.log([ab])



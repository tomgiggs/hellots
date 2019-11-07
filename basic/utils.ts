import * as lodash from "lodash";

let camalData = {
    appId:"22222",
    appName:"333333",
    userPhone:125461852
};
let snakeData = { app_id: '22222', app_name: '333333', user_phone: 125461852 }

/*
该方法只处理键值对数据，不递归，不处理数组
 */
function camel2unix(camelData){
    let snakeData= {};
    for(let key in camelData){
        snakeData[lodash.snakeCase(key)] = camelData[key]
    }
    return snakeData;

}
// camel2unix(camalData)
function snake2Camel(snakeData){
    let camelData= {};
    for(let key in snakeData){
        camelData[lodash.camelCase(key)] = snakeData[key]
    }
    return camelData;
}
// snake2Camel(snakeData);

//计算UUID中包含的时间戳
function getTimeStampFromUUID(uuid) {
    function hex2int(str){
        return parseInt(str,16)
    }
    let date15821015 = 12219292800;
    let newUuid = uuid.replace(/-/g,'');
    let timelow = newUuid.substr(0,8);
    let timemid = newUuid.substr(8,4);
    let timehigh = newUuid.substr(13,3);
    let uuidTime = (hex2int(timehigh)*Math.pow(2,16)+hex2int(timemid))*Math.pow(2,32)+ hex2int(timelow);
    let timeStamp = Math.floor(uuidTime / 10000000 ) - date15821015;
    console.log('uuid timestamp is: ',timeStamp);
}
let uuid = 'c7bd6050-0b10-11e9-8c65-37e9a201b060';
//这个不是次方：console.log(2^3)，正确的应该是2**3
// getTimeStampFromUUID(uuid)

import * as os from 'os'

function getIPAdress() {
    let localIPAddress = "";
    let interfaces = os.networkInterfaces();
    for (let devName in interfaces) {
        let iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                localIPAddress = alias.address;
            }
        }
    }
    console.log(localIPAddress);
    return localIPAddress;
}
// getIPAdress()

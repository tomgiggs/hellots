import * as proto from 'protobufjs';
import * as fs from 'fs';

let model:proto.Root = proto.loadSync('./msg.proto');
let account :proto.Type = model.lookupType('msg.Account') //msg.Account前面的msg是包名，不是文件名
let account01:any = account.create();
account01.accountName = "demo01";
account01.pwd = "sssssssss";

let encoded = account.encode(account01).finish();
console.log(encoded);

fs.writeFile('./proto_output.data',encoded,(err)=>{
    if(err){
        console.log(err);
    }
})


//protoc方式： protoc.exe --js_out=import_style=commonjs,binary:. message.proto
// 下面这段代码莫名其妙就是劳保找不到包：Error: Cannot find module 'google-protobuf'
// 这个包是全局安装的，代码移动到全局node_module目录下就可以运行了
var messagePb = require('./message_pb');
var message = new messagePb.SignInInput(); // 创建一个 Input 结构体
message.setAppId(1);
message.setDeviceId(2000);
message.setUserId(1111);
message.setToken("niceToken");
var bytes = message.serializeBinary(); //serializeBinary  序列化
console.log(bytes);


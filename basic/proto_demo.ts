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






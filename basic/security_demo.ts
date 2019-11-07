import * as crypto from 'crypto';

function getHttpReqDigest(hmackey,reqInfo) {

    return crypto.createHmac('SHA256', hmackey).update(reqInfo).digest('base64');
}
console.log(getHttpReqDigest('sdwe23f23f','host=192.168.211.2 method=post url="/v0.1/api/product/product/actions/searchAll"'));


import * as crc from 'crc-32'
function hashMode(input_str){
    let strCode =  Math.abs(crc.str(input_str));
    return strCode;
}
console.log(hashMode("8895c890-815d-11e9-a273-4371b2d2b106"));


function decryFunc() {
    var secret='pass';//密钥
    var str="55865c169b41298e9cc5def9de14d511";
    var decipher = crypto.createDecipher('aes192', secret);
    var dec = decipher.update(str, 'hex', 'utf8');//编码方式从hex转为utf-8;
    dec += decipher.final('utf8');//编码方式从utf-8;
    console.log(dec)
}

function encry() {
    var secret='pass';//密钥
    var str="12345434";//明文
    var cipher = crypto.createCipher('aes192', secret);
    var enc = cipher.update(str, 'utf8', 'hex');//编码方式从utf-8转为hex;
    enc += cipher.final('hex');//编码方式从转为hex;
    console.log(enc)
}
// decryFunc();
// encry();




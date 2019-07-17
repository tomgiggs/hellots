import * as crypto from "crypto"
import * as fs from "fs"
let stream = fs.createReadStream('E:\\dataset\\tf_data\\t10k-images.idx3-ubyte');
let fsHash = crypto.createHash('md5');

stream.on('data', function(d) {
    fsHash.update(d);
});

stream.on('end', function() {
    let md5 = fsHash.digest('hex');
    console.log("文件的MD5是：%s", md5);
});

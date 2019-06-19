
import * as tesseract from 'node-tesseract';
import * as xpath from 'xpath.js';
import {DOMParser as dom} from 'xmldom';
import * as fs from 'fs';
import * as cheerio from 'cheerio';
import * as request from "request";
import * as crypto from "crypto";
import {func} from "joi";

//参考https://www.jianshu.com/p/fa62eca894c4，不知道为什么从命令行运行没问题，从webstorm上运行就报错。。。。。
function tesseractDemo() {
    tesseract.process('./test.png',function(err, text) {
        if(err) {
            console.error(err);
        } else {
            console.log(text);
        }
    });
}


//xpath样例代码
function extract_html(){
    let xml = fs.readFileSync('./cache/af499e38e0c1d8321ee05f788063ffdd.html', {encoding: 'UTF-8'});
    var doc = new dom().parseFromString(xml, 'text/xml');
    var nodes = xpath(doc, "//h3");
    console.log(nodes[0].localName + ": " + nodes[0].firstChild.data);
    console.log("node: " + nodes[0].toString());
    //cheerio样例代码
    let parser = cheerio.load(fs.readFileSync('./cache/af499e38e0c1d8321ee05f788063ffdd.html'));
    console.log(parser('html').text());
}

//-----------------------------

function download(url:string) {
    let md5 = crypto.createHash('md5');
    let filename = md5.update(url).digest('hex');
    request.defaults({
        proxy:"192.168.211.3:2000"
        // host:"192.168.211.3", //这个是代理设置方式吗？怎么设置代理ip呢
        // localAddress:"192.168.211.3" //绑定ip,好像错误的地址也不会报错。。。
    });
    request.get(url,{
        proxy:"192.168.211.3:2000"
        // host:"192.168.211.3", //这个是代理设置方式吗？怎么设置代理ip呢
        // localAddress:"192.168.211.3" //绑定ip,好像错误的地址也不会报错。。。
    })
        .on('error', function(err) {
            console.error(err)
        })
        .pipe(fs.createWriteStream(filename+'.jpg'))
    return filename;
}
// console.log(download('http://cdn.lizhi.fm/radio_cover/2014/02/15/9524232787310084.jpg'))


function getPhoto() {
    let url = 'http://cdn.lizhi.fm/radio_cover/2014/02/15/9524232787310084.jpg'
    let file = download(url);
    console.log(fs.existsSync(file+'.jpg'))
}
// getPhoto();

function fileHash() {
    let stream = fs.createReadStream('E:\\dataset\\tf_data\\t10k-images.idx3-ubyte');
    let fsHash = crypto.createHash('md5');
    stream.on('data', function(d) {
        fsHash.update(d);
    });

    stream.on('end', function() {
        let md5 = fsHash.digest('hex');
        console.log("文件的MD5是：%s", md5);
    });

}

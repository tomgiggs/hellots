import * as request from 'request';
import * as fs from 'fs'
// let client :request;
let bodyx :any;
import * as crypto from 'crypto'



// client('http://cnodejs.org/', function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       // 输出网页内容
//       console.log(body);
//     }
//   });


// let url = 'https://api.omniexplorer.info/v1/search';
//
// client.post(url, {
//   formData: {query:"31sJBcB59v7FGtmpGAM9xYfecLzJkDj7Kp"},
//   json: true
// }, function (err, res, body) {
//   console.log(body)
// })


function copy_product() {
    let URL = "http://cdn.lizhi.fm/radio_cover/2014/02/15/9524232787310084.jpg";
    let options = {
        url: URL ,
        method: "get",
        headers: {
            "Accept": "application/json",
        },
        json: true,


    };
    request(options, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            fs.writeFileSync('./test.jpg',body);
            console.error("===============================平台返回信息", body);
            return;
        }
        console.error("===============================error", error);
        console.error("===============================body", body);
        console.error("===============================status", response.statusCode);
    });
}
// copy_product()


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
getPhoto()
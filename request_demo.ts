import * as client from 'request';
// let client :request;
let bodyx :any;

// client('http://cnodejs.org/', function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       // 输出网页内容
//       console.log(body);
//     }
//   });


let url = 'https://api.omniexplorer.info/v1/search';
 
 
client.post(url, {
  formData: {query:"31sJBcB59v7FGtmpGAM9xYfecLzJkDj7Kp"},
  json: true
}, function (err, res, body) {
  console.log(body)
})
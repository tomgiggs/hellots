import * as crypto from 'crypto'
let md5 = crypto.createHash('md5');

var result = md5.update('http://cdn.lizhi.fm/radio_cover/2014/02/15/9524232787310084.jpg').digest('hex');
console.log(result)
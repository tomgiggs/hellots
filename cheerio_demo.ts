import * as fs from "fs";
import * as cheerio from 'cheerio';

let parser = cheerio.load(fs.readFileSync('./cache/af499e38e0c1d8321ee05f788063ffdd.html'))
console.log(parser('html').text());



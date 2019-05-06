//xpath样例代码
import * as xpath from 'xpath.js';
import {DOMParser as dom} from 'xmldom';
import * as fs from 'fs';
let xml = fs.readFileSync('./cache/af499e38e0c1d8321ee05f788063ffdd.html', {encoding: 'UTF-8'});
var doc = new dom().parseFromString(xml, 'text/xml')
var nodes = xpath(doc, "//h3")
console.log(nodes[0].localName + ": " + nodes[0].firstChild.data)
console.log("node: " + nodes[0].toString());

//cheerio样例代码
import * as cheerio from 'cheerio';

let parser = cheerio.load(fs.readFileSync('./cache/af499e38e0c1d8321ee05f788063ffdd.html'))
console.log(parser('html').text());

//
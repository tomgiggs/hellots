

import * as os from 'os';
console.log(os.type());
console.log(os.platform());
import * as fs from 'fs';
import * as sequelize from 'sequelize';
import * as elasticsearch from 'elasticsearch'
let client = new elasticsearch.Client({
    host: "http://localhost:9200",
    log: 'error'
})





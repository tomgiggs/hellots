import * as mysql from 'mysql';

let client:mysql.Connection = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'123'
});
client.connect((err)=>{
    if(err){
        console.log(err)
    }
})
// client.query('show databases;',(err,rows,fields)=>{
//     console.log(rows)
// });

let createSql :string = `CREATE TABLE test001 (
    id bigint(20) NOT NULL AUTO_INCREMENT,
    username varchar(50) DEFAULT '',
    phone varchar(20) DEFAULT '',
    PRIMARY KEY (id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `
let querySql = 'select * from test.test001 limit 10';
let columns :Array<any> = [];
client.query(querySql,function(err,rows,fields){
    if(!err){
    for (const field of fields) {
        columns.push(field.name);
    };
    console.log('columns is :'+JSON.stringify(columns));

    for (const row of rows) {
        console.log(JSON.stringify(row));
        
    }
    }else{
        console.log(err)
    }

});




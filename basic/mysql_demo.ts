//定时更新mysql数据库中的一个表
import * as mysql from 'mysql';

let client:mysql.Connection = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'123',
    database:"vr_mmo"
});
client.connect((err)=>{
    if(err){
        console.log(err)
    }
});
//全链路单节点情况下每秒修改720条mysql记录es可以在1s内更新，实际生产环境下性能瓶颈应该是elasticsearch最快达到瓶颈，kafka的吞吐量应该不是问题，canal根据官方性能测试应该可以跟mysql保持同步，目前重点测试elasticsearch的吞吐能力
let i = 521;
let isLast=true;
let a = setInterval(()=>{
    let updateSql = 'update d_product_set set online='+i;
    console.log(updateSql);
    client.query(updateSql,(err,result)=>{
        if(err){
            console.log(err);
            client.rollback();
        }else {
            client.commit();
            if(isLast){
                client.end(); //这里是使用end()函数来关闭连接，不是close
            }
        }
    });
    i+=1;
    if (i>620){
        isLast = true;
        console.log('exiting.......')
        clearInterval(a);
        // client.end();
    }
},800);
// client.end();
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
//执行查询操作，主要使用SQL进行操作
// let querySql = 'DESCRIBE vr_mmo.d_product_set';
let querySql = 'select * from  vr_mmo.d_product_set';

let columns :Array<any> = [];
client.query(querySql,function(err,rows,fields){
    if(!err){
    // for (const field of fields) {
    //     columns.push(field.name);
    // };
        for (const column of rows) {
            columns.push(column.Field)
        }
    console.log('columns is :'+JSON.stringify(columns));

    // for (const row of rows) {
    //     console.log(JSON.stringify(row));

    // }
    }else{
        console.log(err)
    }
    client.end();
});





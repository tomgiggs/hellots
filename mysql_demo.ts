import * as mysql from 'mysql';

let client:any = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'root 123'
});
client.connect((err)=>{
    if(err){
        console.log(err)
    }
})
client.query('show databases;',(err,rows,fields)=>{
    console.log(rows)
})









import { map } from 'bluebird';
//sequelize-auto -h 数据库的IP地址 -d 数据库名 -u 用户名 -x 密码 -p 端口 -t 表名
import * as SequelizeAuto from 'sequelize-auto';//自动生成模型的工具
let dbconfig:any = {
    database:'test',
    user:'root',
    password:'123',
    host:'127.0.0.1',
    port:3306

}


let auto:any = new SequelizeAuto(dbconfig.database, dbconfig.user, dbconfig.password, {
    host: dbconfig.host,
    dialect: 'mysql',
    directory: './models',
    port: dbconfig.port,
    logging: false,
    additional: {
        timestamps: false,
    },
    camelCase: true,
    camelCaseForFileName: true,

});
auto.run(err=>{
    if(err){
        console.log(err);

    }else{
        console.log('build success');
    }
});

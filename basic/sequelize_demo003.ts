import * as sequelize from 'sequelize';
import { map } from 'bluebird';

//根据表结构生产sequelize模型
//sequelize-auto -h 数据库的IP地址 -d 数据库名 -u 用户名 -x 密码 -p 端口 -t 表名
// import * as SequelizeAuto from 'sequelize-auto';//自动生成模型的工具
// let dbconfig:any = {
//     database:'vr_mmo',
//     user:'root',
//     password:'123',
//     host:'127.0.0.1',
//     port:3306
// }
//
// let auto:any = new SequelizeAuto(dbconfig.database, dbconfig.user, dbconfig.password, {
//     host: dbconfig.host,
//     dialect: 'mysql',
//     directory: './models',
//     port: dbconfig.port,
//     logging: false,
//     additional: {
//         timestamps: false,
//     },
//     camelCase: true,
//     camelCaseForFileName: true,
//
// });
// auto.run(err=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log('build success');
//     }
// });
let client= new sequelize(
    'vr_mmo',
    'root',
    '123',
    {
        'dialect': 'mysql',
        'host': 'localhost',
        'port': 3306,
        // 'define': {
        //     'underscored': true ,
        //     'charset': 'utf8',
        //     'collate': 'utf8_general_ci',
        //     'freezeTableName': true,
        //     'timestamps': true,
        // },
        'pool': {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
    }
);

// let  xxxx =require('./models/dProductBase')(client,sequelize);
// let  yyyy =require('./models/dProductDeploy')(client,sequelize);
// // import dProductDeploy from './models/dProductDeploy'
// import dProductBase from './models/dProductBase'
// let result = xxxx.findAll({
//     include: [{
//         model: dProductBase,
//         where: { flag: 4 }
//     }]
// })
// console.log(result.all().then((data) => {
//     for(let row of data[0]){
//         console.log(row);
//         break;
//         console.log(row.app_id+'_'+row.app_version+'_'+row.access_type+'_'+row.code_type+'_'+row.versioncode)
//     }
//     // console.log(data);
// }));

import dProductDeploy from '../models/dProductDeploy'
import dProductBase from '../models/dProductBase'
let dbase = client.define("d_product_base",dProductBase);
let ddeploy = client.define("d_product_deploy",dProductDeploy);

//报错 d_product_base is not associated to d_product_deploy! 网上说要关联查询需要在模型定义里面写明关系“多表首先是定义model时就声明多表之间的关系”，fuck!!!!!!!
let result = ddeploy.findOne();

// {
//     raw:true,
//         include: [{
//     model: dbase,
//     where: { flag: 4 }
// }]
// }

console.log(result.then((data) => {

    // for(let row of data){
    //     console.log(row);
    //     break;
    //     // console.log(row.app_id+'_'+row.app_version+'_'+row.access_type+'_'+row.code_type+'_'+row.versioncode)
    // }
    console.log(data);
}));






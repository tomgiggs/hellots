import * as sequelize from 'sequelize';
import { userInfo } from 'os';
let client= new sequelize(  
        'test',
        'root',  
        '123',  
         { 
               'dialect': 'mysql', 
               'host': 'localhost', 
               'port': 3306,  
                'define': {  
                        'underscored': true ,
                        'charset': 'utf8',
                        'collate': 'utf8_general_ci',
                        'freezeTableName': true,
                        'timestamps': true,
               },
                'pool': {
                        max: 5,
                        min: 0,
                        acquire: 30000,
                        idle: 10000
                },
            } 
     );
//定义表结构
const User = client.define('user', {
    uid: {
        type: sequelize.STRING
    },
    fullname: {
        type: sequelize.STRING
    }
    },{
        timestamps: false,
        createdAt: false, //取消添加列
        // updatedAt: 'updateTimestamp',修改列名
        updatedAt: false
    });
    
// force: true 如果表已经存在，将会丢弃表
// User.sync({force: true}).then(() => {
// // 表已创建
// return User.create({
//     uid: '22222222222',
//     fullname: 'Hancock'
// });
// });
//查询记录,使用的是异步回调方式，不是同步返回一个结果
// let result = User.findOne({
// User.findAll({
//     where:{
//         uid: '22222222222'
//     }
// }).then(result=>{
//     console.log(result);
//     for(var one of result){
//             console.log(one);
//         }

// }).catch(err=>{
//     console.log(err)
// });


// User.findOne({
//     where:{
//         uid: '22222222222'
//     }
// }).then(result=>{
//     // console.log(result);
//     result.upsert({
//         fullname:'gooooooooooooood'


//     },{
//     transaction:true
// })

// }).catch(err=>{
//     console.log(err)
// });
//插入记录，更网上代码不一样，这个并不是更新数据,给跪了，半天不知道怎么更新。。。。
User.update({fullname:'gooooooooooooood' }, { where: { uid: '22222222222' } });
// client.transaction( t => {
//     return User.upsert({
//         uid: '22222222222',
//         fullname:'gooooooooooooood'
//     }).then( result => {
//         console.log('update succes')
//     }).catch(err => {
//         console.log(`修改数据${err}`)
//     })
// })

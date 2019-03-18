import * as sequelize from 'sequelize';
import { userInfo } from 'os';
import { map } from 'bluebird';
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
// User.update({fullname:'gooooooooooooood' }, { where: { uid: '22222222222' } });
// User.destroy({ where: { uid: '22222222222' } });
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


let UserLimit = client.define('user_limit', {
    uid: {
        type: sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'uid'
    },
    works_limits: {
        type: sequelize.INTEGER(20).UNSIGNED,
        allowNull: true,
        defaultValue: '100',
        field: 'works_limits'
    },
    release_wait_time: {
        type: sequelize.INTEGER(20),
        allowNull: true,
        defaultValue: '120',
        field: 'release_wait_time'
    }
},{
    timestamps: false,
    createdAt: false, //取消添加列
    updatedAt: false
});


function getUserLimitById(user_id:string){
    let options = {
        where:{
              uid:user_id
        },
        attributes: ['release_wait_time', 'works_limits'], //指定要返回哪些列
        // order: [['title', 'DESC']]
    };
    UserLimit.findOne(options).then((result:any)=>{
        // console.log(result.dataValues);//这样写在js中是可以正常运行的。。。。，在ts中报result没有属性dataValues,鬼知道你返回的是什么类型啊，含有什么类型啊，我究竟要怎么取到值呢？？？
        console.log(result.dataValues);
        // console.log(result)

    });
}

getUserLimitById('cyl222222')
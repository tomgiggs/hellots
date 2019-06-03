

let productidAndVersion = new Set();
productidAndVersion.add("22223333")

productidAndVersion.add("ssssssss");
console.log(productidAndVersion)



let a= 'aa,bb,cc'
let b = 'aa,dd,ee'
let list = []
list = list.concat(a.split(','))
list= list.concat(b.split(','))
console.log(list)

console.log(escape('http://baidu.com/百度。#?sss=aaaa'))
// console.log(unescape("http%3A//baidu.com/%u767E%u5EA6%u3002"))
console.log(encodeURI('http://baidu.com/百度。#'))
console.log(encodeURIComponent('http://baidu.com/百度#。聪明。#'))



// import * as csvkit from "csvtojson"
// let header = ["guid","productname","ownerid","ownername","resid","online","score","scorenumber","VERSION","versioncode","screenshot","icon",
//     "releasetime","updatetime","createtime","category","flag","`limit`","privacy","price","baseid","statement","`area`","is_exp_protocol","base_version",
//     "grade","search_heat","pc","web","android","ios","wp","pc_edit","web_edit","android_edit","ios_edit","wp_edit","need_server","need_deploy","played_num","productid",
//     "game_tags","other_game_tags","edu_tags","other_edu_tags","updatetime","customed_tags","customed_game_tags","customed_edu_tag"]
//
//
// csvkit({headers:header,delimiter:"\t"}).fromFile('product_info.csv',{
//
// }).then(record=>console.log(record))
// let aa = new Set(['11','22']);
// console.log(aa.keys())
// let bb = []
// aa.forEach((key,value)=>{
//     bb.push(value)
// })
// console.log(bb)

//--------------
//joi demo the project github location is:https://github.com/hapijs/joi/blob/v13.3.0/API.md
var Joi = require('joi')
let params = {
    "playerid": "888",
    "productid":"aaaaaaaaaaaa",
    "newname": "aaaaaas"

}
const schema = Joi.object().keys({
    playerid:Joi.number().integer().min(1).required().label('playerid must be number'), //自定义标签，会打印在错误信息里面
    productid: Joi.string().max(64).required(),
    newname: Joi.string().max(10).required().description('new name mmus no longer than 10 char'),
    whendemo:Joi.when('playerid',{is:Joi.equal(78),then:Joi.string().max(20).required(),otherwise:Joi.optional()})

})

// const schema = Joi.object().keys({
//     playerid:Joi.number().integer().min(1).required().label('playerid must be number'), //自定义标签，会打印在错误信息里面
//     productid: Joi.string().max(64).required(),
//     //     .error((errors)=>{
//     //     return {
//     //         template: 'contains {{errors}} errors, here is the list : {{codes}}',
//     //         context: {
//     //             errors: errors.length,
//     //             codes: errors.map((err) => err.type)
//     //         }
//     //     };
//     // }),
//     newname: Joi.string().max(10).required().description('new name mmus no longer than 10 char'),
//     whendemo:Joi.when('playerid',{is:Joi.equal(78),then:Joi.string().max(20).required(),otherwise:Joi.optional()})})

//     .error((errors)=> {
//     return {
//         template: 'contains {{errors}} errors, here is the list : {{codes}}',
//         context: {
//             errors: errors.length,
//             codes: errors.map((err) => err.type)
//         }
//     };
// });


let result = Joi.validate(params,schema,{allowUnknown:true, abortEarly: true,convert:true,noDefaults:true })
// console.log(result);
if(result.error){
    console.log(result)
    // console.log(result.error.details[0].path)

    // console.log(result.error.details[0].path[0])
}else {
    console.log(params)
}




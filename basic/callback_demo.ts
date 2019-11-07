import * as async from 'async';
import * as fs from 'fs';
import * as thunkify from 'thunkify';
// async.waterfall([//这个是一个调用链列表，函数间用逗号分隔
//     function(cb){
//         fs.readFile('./tsconfig.json','utf-8',(err,result)=>{
//             cb(err,result);
//         });
//     },
//     function(result,err){//这个参数是有顺序的，第一个是上一个输出的返回，第二个是错误处理函数，在写ts代码时要注意参数的顺序问题
//         try{
//             console.log('callback run success');
//                     console.log(result);
//         }catch(err){
//             console.log(err)
//         }

//     }
// ])
//async使用测试
// async function logout(uid:string){
//     let json  = await fs.readFile('./tsconfig.json','utf-8',(err,result)=>{
//         if(!err){
//             // console.log(result);
//             return result;
//         }else{
//             console.log(err);
//             return 'error happend';
//         }
 
//                 });
//     console.log(json); //为什么这个是输出undefined呢，await没起作用。。。


// }
// logout("sss")
async function demo01(name:string){
    return 'the name is:'+name;
}

async function demo02(){
    
    console.log(await demo01('ggggggggggg'));//await只能在异步函数中使用，不能单独使用，async和await是配合使用的，如果要await的函数没有async修饰，那也就不会等待？
}
// demo02()
class FateError extends Error {
    constructor(message) {
        super(message);
        this.name = "FateError";
    }
}

class FateError2 extends Error {
    constructor(message) {
        super(message);
        // Object.setPrototypeOf(this, Error.prototype);
        this.name = "FateError2";
    }
}

function async_demo(){
    async.auto({
        func1:(cb)=>{
            setTimeout(()=>{
                console.log("func1 awake...")
                // cb(null,true)
                cb(new FateError("break demo"))//这样退出循环
            },1000)
        },
        // func2:(cb,res)=>{
        //     setTimeout(()=>{
        //         console.log("func2 awake...")
        //         cb(null,true);
        //         return;//return只返回当前函数，并不影响外层函数
        //     },1000)
        //
        // },
        func3:["func1",(cb,res)=>{
            console.log("callback error exit...")
        }]

    },(err,result)=>{
        console.log( err instanceof FateError);
        if(err){

            console.log("find error .....");
            return
        }
        console.log(result)
    });
}

async_demo();

function loopAsync() {
    var totalArr = [56, 56, 56, 21, 32];
    let user = "";
    async.whilst(function () {
        return totalArr.length>0;
    }, (cb) => {
        totalArr.pop();
        console.log(totalArr);
        cb(null,totalArr);
    }, (err, result) => {
        console.log(result);

    });
}

//----------黑暗代码------------------------------
// let readFile:any = thunkify(fs.readFile);
// async function ss(){
//     console.log(await readFile('./tsconfig.json').toString())
// }
// console.log(ss());









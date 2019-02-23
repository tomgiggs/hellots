import * as fs from "fs";

//可选参数函数
function dynamic(first:string,second?:any){
    console.log('first arg is:'+first);
    console.log('second arg is:'+second);
    console.log('args num is :')
};
// dynamic('first','sss')

// dynamic('only one arg')

//固定参数函数
function spined(first:string,second:number){
    console.log('first arg is:'+first);
    console.log('second arg is:'+second);
    console.log('args num is :')
};

// spined('first',22);

//具有默认参数的函数

function defaultarg(first:string,second:number=20){
    console.log('first arg is:'+first);
    console.log('second arg is:'+second);
    console.log('args num is :')
};
// defaultarg('goood')

//不定数量参数


function unknow_args(...args){
    console.log(args.length);
    args.forEach((arg)=>{
        console.log(arg)
    })
};

// unknow_args(44,55,5,7,88,99,10)

function unknow_arg(name:string,...args){
    console.log('the name is :'+name);
    console.log(args.length);
    args.forEach(arg=>{
        console.log(arg)
    })
};
// unknow_arg('tom',11,22,33,44,55,66)


//------------------------------------
function no_arg(){//定义没有参数的话调用是不能添加参数的，不然会爆粗

    for (const arg of arguments) {
        console.log(arg);
    }
};
// no_arg('tom',11,22,33,44,55,66)
//------------------------------------

function callback_fun(name:string,cb:(msg:string)=>void){ //如果没有指定返回类型的话会报语法错误,如果调用类型错误的话调用会失败
    cb('20');

}

// callback_fun('tom', msg=>{
// console.log(msg);
// });
//------------------------------------

function callback_test(name:string,cb:(msg:string)=>string) :string{ //最后这个void是做什么用的呢？用来指定这个函数返回类型的，主要用于导出函数
    cb('20');
    return "";

}

callback_test('tom', msg=>{
console.log(msg);
return 'goooooooooooood';
});






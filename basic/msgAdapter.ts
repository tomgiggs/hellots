
//重构数据的方法
export function reshapeTable(data:any,rules:any) {

    let ignored_keys = [];
    rules =[{
            name:"",
            oper_type:1, //操作类型，1：新建，2：删除
            from:["guid","productid"], //来源：如果由多个字段组成，需要指明指明连接
            need_split:true,//字段分割
            sepertor:"" //字段分隔符，空串为等值复制，其他字符为正常连接
        }
        ]

    for(let rule of rules){
        if(rule.oper_type==1){
            //来源于单字段
            if(rule.from.length==1){
                if(rule.need_split){
                    data[rule.name] = data[rule.from[0]].split(rule.separator);
                }else {
                    data[rule.name] = data[rule.from[0]];
                }
            }else {//字段由多个字段组成
                if(rule.need_split){
                    if(!rule.separator){//需要分割没有分割符就直接组成列表
                        data[rule.name] = [];
                        for(const t of rule.from){
                            data[rule.name].push(t);
                        }
                    }else {//需要分割，同时提供了分割符就将字段全部切开组成一个列表
                        data[rule.name] = [];
                        let tmp_taglist = []
                        for(const t of rule.from){
                            tmp_taglist = tmp_taglist.concat(t.split(rule.sepertor));
                        }
                        let tmp_set = new Set(tmp_taglist);
                        tmp_set.forEach((key,value)=>{
                            data[rule.name].push(value);
                        });
                    }
                }else {//不需要分割
                    if(!rule.separator){//没有分割符就直接组成列表
                        data[rule.name] = [];
                        for(const t of rule.from){
                            data[rule.name].push(t);
                        }
                    }else {//不需要分割，同时提供了分隔符就使用分隔符连接字符串

                        let tmp_taglist = []
                        for(const t of rule.from){
                            tmp_taglist = tmp_taglist.concat(t.split(rule.sepertor));
                        }
                        data[rule.name] = tmp_taglist.join(rule.sepertor);
                    }
                }
            }
        }
        else {
            ignored_keys.push(rule.name);
        }
    }

    for(let ignore of ignored_keys){
        delete data[ignore];//发现可以删除赋值给新键的键，这个说明是底层是通过赋值而不是引用方式实现的
    }



    return data;
}






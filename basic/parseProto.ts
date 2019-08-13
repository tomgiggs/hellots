import * as fs from "fs";
var protobuf = require("protobufjs");

class ProtoParser {
    protos = {};
    rootPath = 'D:\\workspace\\Edbox_Server\\game-server\\proto';

    public constructor(root:string){
        if(root){
            this.rootPath = root;
        }
    }

    public parseProto(filename){
        protobuf.load(filename, function (err, root) {
            let menber = {};
            if(!root){
                return;
            }
            let protoPackageName = Object.keys(root.nested)[0];
            let zyggot = root.nested[protoPackageName].nested;
            if(!zyggot){
                return
            }
            let funcList = Object.keys(zyggot);
            for (let func of funcList) {
                let fieldInfo = {};
                let fields = zyggot[func].fields;
                for (let field of Object.keys(fields)) {
                    let type = fields[field].type;
                    if (type == "uint32" || type == "uint64") {
                        type = "number";
                    }
                    if (type == "bool") {
                        type = "boolean";
                    }
                    if (fields[field].optional) {
                        continue;
                    }
                    fieldInfo[field] = type;
                }
                menber[func] = fieldInfo;
            }
            this.protos[protoPackageName]=menber;
        });
    }

    
    public parseProtoSync(filename){
        let fileNameList = filename.toLowerCase().split("\\");
        let fullPackageNmae = fileNameList[fileNameList.length-1].split('.')[0];
        let root = protobuf.loadSync(filename );
        let menber = {};
        if(!root){
            console.log("not root find: ",filename);
            return;
        }
        let protoPackageName = Object.keys(root.nested)[0];
        let zyggot = root.nested[protoPackageName].nested;
        if(!zyggot){
            console.log("not member find: ",filename);
            return
        }
        let funcList = Object.keys(zyggot);
        for (let func of funcList) {
            let fieldInfo = {};
            let fields = zyggot[func].fields;
            for (let field of Object.keys(fields)) {
                let type = fields[field].type;
                if (type == "uint32" || type == "uint64"||type == "int32" || type == "int64"||type == "float" || type == "double") {
                    type = "number";
                }
                if (type == "bool") {
                    type = "boolean";
                }
                if (fields[field].optional) {
                    continue;
                }
                fieldInfo[field] = type;
            }
            menber[func] = fieldInfo;
        }
        if(this.protos[protoPackageName]){
            console.log("duplicate packageName find: ",filename);
            console.log(protoPackageName)
        }
        this.protos[fullPackageNmae]=menber;
    }



    public  parseAll() {
        fs.readdir(this.rootPath,(err,data)=>{
            console.log("get total file num: ",data.length);
            for(let file of data){
                // console.log(file)
                if(file.endsWith(".proto")){
                    try{
                        this.parseProtoSync(this.rootPath+"\\"+file);
                    }catch (e) {
                        console.log(e);
                        console.log("invilad proto file:",file );
                    }
                }
            }
            console.log("valid proto num is: ",Object.keys(this.protos).length);
        })
    }
    public  parseAllSync() {
        let data = fs.readdirSync(this.rootPath);
        console.log("get total file num: ",data.length);
        for(let file of data){
            // console.log(file)
            if(file.endsWith(".proto")){
                try{
                    this.parseProtoSync(this.rootPath+"\\"+file);
                }catch (e) {
                    console.log(e);
                    console.log("invilad proto file:",file );
                }
            }
        }
        console.log("valid proto num is: ",Object.keys(this.protos).length);
        console.log(this.protos)
    }
}

let demo = new ProtoParser("D:\\workspace\\Edbox_Server\\game-server\\proto");
// demo.parseAll();
demo.parseAllSync()





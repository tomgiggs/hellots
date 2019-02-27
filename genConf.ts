import { Dictionary } from "lodash";

const fs = require('fs');
let rawConf:string = `
worker_processes  1;
events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;
    rewrite_log on;
    sendfile        on;
    keepalive_timeout  65;
    gzip  on;
    server {
        listen       82;
        server_name  localhost;
        location /image {
            root   html;
            index  index.html index.htm;
            proxy_pass 
            $$$
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }

}`


let arg = process.argv.splice(2);
let sourceFile:string  = arg[0];
let dest:string = arg[1];
// console.log(sourceFile,dest);

function genconf(filePath,dest){
    fs.readFile(filePath,(err,result)=>{
        let pathConf:any = JSON.parse(result);
        let rewrites:string = '';
        for (const x of pathConf.Redirect) {
            let record = "rewrite '"+x.Path +"' " +x.NewPath +" break;\t\n"
            rewrites+=record;
        }
        let targetConf = rawConf.replace('$$$',rewrites);
        // console.log(targetConf);
        if(!dest){
            dest='./'
        }
        fs.writeFile(dest+'target.conf',targetConf,(err)=>{
            if(err){
                console.log(err);
            }

        })

    })
}
genconf(sourceFile,dest)


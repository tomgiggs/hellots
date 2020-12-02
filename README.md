ts/js前端学习代码&&依赖库试验田
[tslint配置可以参考博客](https://blog.csdn.net/qq_40920553/article/details/81532951)
## 后端代码用到前端的方式
后端代码要搬到前端浏览器运行需要使用打包方式，打包后的代码到浏览器只能导入，不能再使用require/import之类的接着导入了？
1. 使用browserify打包代码

|| browserify main.js >final.web.js
2. 自己实现require 、module 、exports 三个变量
   阮一峰在博客中提供了一个现成的样例，下载后放在chat/require.js里面，用法如下:
   ```html
    <script src="require.js" />
    <script>
        require.register("proto.js", function(module, exports, require){
            //将protobuf代码贴到这里来
        });

        var protoRoot = require("../proto/proto.js");
        console.log(protoRoot.lookup("pb.Text"))
    </script>
   ```
   这里是比较简单的require，如果是复杂依赖的话还是要用打包工具打包的，看上去好像没什么意义。。。。

## proto文件在浏览器的使用
### 直接引用proto文件
```html
    <script src="./protobuf.min.js"></script>//这个是从GitHub下载下来的，也可以直接引用网上的
    <!-- <script src="//cdn.rawgit.com/dcodeIO/protobuf.js/6.X.X/dist/protobuf.min.js"></script> -->
    <script>
        protobuf.load("./message.proto", function(err, root) {//这种方式不是直接以js代码发布，要怎么将proto转js后直接引用呢
            if (err)
                throw err;
            var AwesomeMessage = root.lookupType("pb.Text");//pb是包名，不是文件名
            var payload = { text: "AwesomeString" };
            var errMsg = AwesomeMessage.verify(payload);
            if (errMsg)
                throw Error(errMsg);
            var message = AwesomeMessage.create(payload); // or use .fromObject if conversion is necessary
            var buffer = AwesomeMessage.encode(message).finish();
            console.log(buffer)
            var message = AwesomeMessage.decode(buffer);
            console.log(message)
        });
    </script>
```

### proto转js后使用
1. 先将proto文件转为js文件
```
pbjs -t json-module -w commonjs -o scripts/proto.js pkg/proto/*.proto ##需要先安装 protobufjs
protoc.exe --js_out=import_style=commonjs,binary:. message.proto ##生成message_pb.js文件
```

2. 新建一个main.js文件引用生成的protobufjs文件
```
var protoRoot = require('../proto/proto.js');
const SendMessageReq = protoRoot.lookup('RegisterDeviceReq');
var payload ={
    appId:1,//字段是下划线转驼峰
    type:12,
    sdkVersion:'2',
    systemVersion:'222',
    brand: 'huawei',
};
let errMsg = SendMessageReq.verify(payload);
if (errMsg !=null){
    console.log('payload解析错误：', errMsg);
}
const wsData = SendMessageReq.create(payload);
var encoded = SendMessageReq.encode(wsData).finish();//记得调用finsh，不然会解析错误
console.log(encoded);
console.log(SendMessageReq.decode(encoded));
详情参考：https://github.com/protobufjs/protobuf.js

```
3. 使用browserify将main.js转为浏览器支持的文件
   
   由于是使用commonjs的require导入代码，浏览器是不支持的，所以需要打包后才能到浏览器运行，一经打包导入浏览器便无法再做修改，浏览器中无法获取到相关对象，所以要在浏览器中使用的所有功能都必须使用编写完整，不能在浏览器中使用script方式引用打包后的东西,除非使用: window['WSClient'] = Client;这样导出.
   
   browserify打包后的console.log中如果含有中文字符的话会出现导入失败！
browserify main.js >final.web.js

4.在浏览器导入运行即可
<script src="./final.web.js"></script>

## 疑问
下面这两种导入方式，第一种成功了，第二种却失败了，这是为什么呢？   
    <script src="./chat_ws_proto.web.js"></script>
    <script src="./chat_ws_proto.web.js"/>




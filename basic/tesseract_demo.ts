//参考https://www.jianshu.com/p/fa62eca894c4，不知道为什么从命令行运行没问题，从webstorm上运行就报错。。。。。
import * as tesseract from 'node-tesseract';
tesseract.process('./test.png',function(err, text) {
    if(err) {
        console.error(err);
    } else {
        console.log(text);
    }
});




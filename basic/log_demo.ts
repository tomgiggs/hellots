import * as log4js from "log4js";
//旧接口改了，需要新的配置格式了
// let log4js_config = require("./logConf.json");
// log4js.configure(log4js_config);
// let LogFile:log4js.Logger = log4js.getLogger('log_file');
// LogFile.level('info');
// LogFile.log('this is a log file demo');
// log4js.configure({
//     appenders: [
//         { type: 'console' }, {
//             type: 'dateFile',
//             filename: 'logs/log',
//             pattern: "_yyyy-MM-dd",
//             maxLogSize: 1024,
//             alwaysIncludePattern: false,
//             backups: 4,
//             category: 'logger'
//         }
//     ],
//     replaceConsole: true
// });
// log4js.configure({
//     appenders: {
//       out: { type: 'stdout' },
//       app: { type: 'file',
//       filename: 'application.log'
//     }
//     },
//     categories: {
//       default: {
//           appenders: [ 'out', 'app' ],
//           level: 'debug' }
//     }
//   })
log4js.configure({
  appenders: {
    service: {
      type: "dateFile",
      filename: "log_demo.log",
      pattern: ".yyyy-MM-dd"
      // compress: true
    }
  },
  categories: {
    default: {
      appenders: ["service"],
      level: "debug"
    }
  }
});
let logger: log4js.Logger = log4js.getLogger("ddddd"); //这个会出现在log日志中的时间戳后面，表示是哪个logger输出的

logger.info("this is a log demo output");

//-------------------------

import * as loger from "log4js"
loger.configure({
  appenders: { //日志事件序列化为某种形式的输出
    default: {
      type: "dateFile",
      layout: {
        type: "pattern",
        pattern: "%[[%d{ISO8601_WITH_TZ_OFFSET}] [%h] [%c] [%p] %] %m%n",
      },
      filename: "default.log",
      pattern: ".yyyy-MM-dd"
    },
    xxx: {
      type: "dateFile",
      filename: "xxx.log",
      pattern: ".yyyy-MM-dd"
    },
    yyy: {
      type: "dateFile",
      filename: "yyy.log",
      pattern: ".yyyy-MM-dd"
    }

  },
  categories: { //用于分组日志事件的标签
    default: {
      appenders: ["default"],
      level: "debug" //日志等级
    },
    xxx: {
      appenders: ["xxx"],
      level: "debug"
    },
    yyy: {
      appenders: ["yyy"],
      level: "debug"
    }
  }
});

export class XLoader{
  options:any = null;
  logger: loger.Logger = null//这个会出现在log日志中的时间戳后面，表示是哪个logger输出的

  public constructor(consumerOptions?:any) {
    this.options = consumerOptions;
    this.logger = loger.getLogger(consumerOptions.logName); //getLogger获取的是category，不是appender
  }
  public log(msg:any){
    this.logger.error(msg);
    console.log('write log finsh')
  }


}
let demo = new XLoader({
  logName:"xxx"
})
demo.log("hhhhhhhh");











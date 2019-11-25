import { timesToDate } from "./utils/formateDate";

enum LogLevel{
  DEBUG,
  INFO,
  WARNING,
  ERROR,
  NONE,
}

let prefix: string = "easyLogger";//日志输出的前缀
let logUpload: boolean =  true;//是否开启日志上传
let logLevel: number = LogLevel['NONE'];//默认不输出日志
let uploadServeTranslators: any[] = [];//中间件执行队列

export default {

  DEBUG: LogLevel['DEBUG'],
  INFO: LogLevel['INFO'],
  WARNING: LogLevel['WARNING'],
  ERROR: LogLevel['ERROR'],
  NONE: LogLevel['NONE'],

  /**
   * 调用本方法添加日志的中间件。
   * Note:
   * 
   **/
  use (callback: Function) {
    if (typeof callback === "function") {
      uploadServeTranslators.push((data: any, next: Function) => {
        callback(data, next);
      });
    }
  },

  /**
   * 调用本方法开启日志上传。
   * 开启后 SDK 的日志会上传到 Agora 的服务器。
   * 日志上传功能默认为关闭状态，如果你需要开启此功能，请确保在所有方法之前调用本方法。
   * Note:
   * 如果没有成功加入频道，则服务器上无法查看日志信息。
   **/
  enableLogUpload () {
    if (logUpload) {
      this.warning("Failed to enable log upload, Already enabled.");
    } else  {
      logUpload = true;
    }
  },

  /**
   * 该方法用于关闭日志上传。
   * 日志上传默认是关闭状态，如果你调用了开启日志上传（enableLogUpload)，可以通过本方法
   * 停止上传日志。
   **/
  disableLogUpload () {
    if (logUpload) {
      logUpload = false;
    } else  {
      this.warning("Failed to disabled log upload, Already disabled.");
    }
  },

  /**
   * 该方法设置 SDK 的日志输出级别。
   * 日志级别顺序依次为 NONE，ERROR，WARNING，INFO，DEBUG。选择一个级别，你就
   * 可以看到在该级别及该级别以上所有级别的日志信息。例如，如果你输入代码
   * AgoraRTC.Logger.setLogLevel(AgoraRTC.Logger.INFO);，就可以看到 INFO，ERROR 和
   * WARNING 级别的日志信息。
   * Parameters
   * level: DEBUG | INFO | WARNING | ERROR | NONE
   * 开发者设置的日志过滤级别，默认为 NONE。
   **/
  setLogLevel (level: number, prefix: string) {
    prefix && (prefix = prefix);
    if ("number" === typeof level && level > -1 && level < 5) {
      logLevel = level;
    }
  },

  /**
   * 该方法输出错误级的日志。
   **/
  error (...args: any[]) {
    // if ((logLevel < LogLevel['ERROR'] && logLevel > LogLevel['DEBUG'] && logLevel < LogLevel['NONE']) || logLevel === LogLevel['NONE']) return;
    if ((logLevel > LogLevel['ERROR'] && logLevel !== LogLevel['NONE']) || logLevel === LogLevel['NONE']) return;
    
    let params: any = args;
    let nowTime: any = Date.now();
    params.unshift(timesToDate(nowTime, "hh:mm:ss") + " " + prefix + "-SDK [ERROR]: ");

    if (uploadServeTranslators.length > 0) {
      uploadServeTranslators.map(task => {
        task({
          type: "error",
          params,
          timestamp: nowTime
        }, () => {
          console.error.apply(console, params);
        })
      });
    } else {
      console.error.apply(console, params);
    }
  },

  /**
   * 该方法输出警告级的日志。
   **/
  warning (...args: any[]) {
    // if ((logLevel < LogLevel['WARNING'] && logLevel > LogLevel['DEBUG'] && logLevel < LogLevel['NONE']) || logLevel === LogLevel['NONE']) return;
    if ((logLevel > LogLevel['WARNING'] && logLevel !== LogLevel['NONE']) || logLevel === LogLevel['NONE']) return;
    let params: any = args;
    let nowTime: any = Date.now();
    params.unshift(timesToDate(nowTime, "hh:mm:ss") + " " + prefix + "-SDK [WARNING]: ");

    if (uploadServeTranslators.length > 0) {
      uploadServeTranslators.map(task => {
        task({
          type: "warning",
          params,
          timestamp: nowTime
        }, () => {
          console.warn.apply(console, params);
        })
      });
    } else {
      console.warn.apply(console, params);
    }
  },

  /**
   * 该方法输出消息级的日志。
   **/
  info (...args: any[]) {
    // if ((logLevel < LogLevel['INFO'] && logLevel > LogLevel['DEBUG'] && logLevel < LogLevel['NONE']) || logLevel === LogLevel['NONE']) return;
    if ((logLevel > LogLevel['INFO'] && logLevel !== LogLevel['NONE']) || logLevel === LogLevel['NONE']) return;
    let params: any = args;
    let nowTime: any = Date.now();
    params.unshift(timesToDate(nowTime, "hh:mm:ss") + " " + prefix + "-SDK [INFO]: ");

    if (uploadServeTranslators.length > 0) {
      uploadServeTranslators.map(task => {
        task({
          type: "info",
          params,
          timestamp: nowTime
        }, () => {
          console.log.apply(console, params);
        })
      });
    } else {
      console.log.apply(console, params);
    }
  },

  /**
   * 该方法输出debug级的日志。
   **/
  debug (...args: any[]) {
    if ((logLevel > LogLevel['DEBUG'] && logLevel !== LogLevel['NONE']) || logLevel === LogLevel['NONE']) return;
    let params: any = args;
    let nowTime: any = Date.now();
    params.unshift(timesToDate(nowTime, "hh:mm:ss") + " " + prefix + "-SDK [DEBUG]: ");

    if (uploadServeTranslators.length > 0) {
      uploadServeTranslators.map(task => {
        task({
          type: "debug",
          params,
          timestamp: nowTime
        }, () => {
          console.log.apply(console, params);
        })
      });
    } else {
      console.log.apply(console, params);
    }
  },
};
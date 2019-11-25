import { timesToDate } from "./utils/formateDate";

enum LogLevel{
  DEBUG = 0,
  INFO,
  WARNING,
  ERROR,
  NONE,
}

export default class SupLogger {

  private logPrefix: string = "SupLogger";//日志输出的前缀
  private logLevel: number = LogLevel['NONE'];//默认不输出日志
  // private logUpload: boolean = false;
  private uploadServeTranslators: any[] = [];//中间件执行队列

  protected DEBUG: Number = LogLevel['DEBUG'];
  protected INFO: Number = LogLevel['INFO'];
  protected WARNING: Number = LogLevel['WARNING'];
  protected ERROR: Number = LogLevel['ERROR'];
  protected NONE: Number = LogLevel['NONE'];

  constructor () {

  }

  /**
   * 调用本方法添加日志的中间件。
   * Note:
   * 
   **/
  use (callback: Function) {
    if (typeof callback === "function") {
      this.uploadServeTranslators.push((data: any, next: Function) => {
        callback(data, next);
      });
    }
  }

  /**
   * 调用本方法开启日志上传。
   * 开启后 SDK 的日志会上传到 Agora 的服务器。
   * 日志上传功能默认为关闭状态，如果你需要开启此功能，请确保在所有方法之前调用本方法。
   **/
  // enableLogUpload () {
  //   if (this.logUpload) {
  //     this.warning("Failed to enable log upload, Already enabled.");
  //   } else  {
  //     this.logUpload = true;
  //   }
  // }

  /**
   * 该方法用于关闭日志上传。
   * 日志上传默认是关闭状态，如果你调用了开启日志上传（enableLogUpload)，可以通过本方法
   * 停止上传日志。
   **/
  // disableLogUpload () {
  //   if (this.logUpload) {
  //     this.logUpload = false;
  //   } else  {
  //     this.warning("Failed to disabled log upload, Already disabled.");
  //   }
  // }

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
    prefix && (this.logPrefix = prefix);
    if ("number" === typeof level && level > -1 && level < 5) {
      this.logLevel = level;
    }
  }

  /**
   * 该方法输出错误级的日志。
   **/
  error (...args: any[]) {
    // if ((logLevel < LogLevel['ERROR'] && logLevel > LogLevel['DEBUG'] && logLevel < LogLevel['NONE']) || logLevel === LogLevel['NONE']) return;
    if ((this.logLevel > LogLevel['ERROR'] && this.logLevel !== LogLevel['NONE']) || this.logLevel === LogLevel['NONE']) return;
    
    let params: any = args;
    let nowTime: any = Date.now();
    params.unshift(`[${timesToDate(nowTime, "YYYY-MM-DD hh:mm:ss")}] ${this.logPrefix} [ERROR] - `);

    if (this.uploadServeTranslators.length > 0) {
      this.uploadServeTranslators.map(task => {
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
  }

  /**
   * 该方法输出警告级的日志。
   **/
  warning (...args: any[]) {
    // if ((logLevel < LogLevel['WARNING'] && logLevel > LogLevel['DEBUG'] && logLevel < LogLevel['NONE']) || logLevel === LogLevel['NONE']) return;
    if ((this.logLevel > LogLevel['WARNING'] && this.logLevel !== LogLevel['NONE']) || this.logLevel === LogLevel['NONE']) return;
    let params: any = args;
    let nowTime: any = Date.now();
    params.unshift(`[${timesToDate(nowTime, "YYYY-MM-DD hh:mm:ss")}] ${this.logPrefix} [WARNING] - `);

    if (this.uploadServeTranslators.length > 0) {
      this.uploadServeTranslators.map(task => {
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
  }

  /**
   * 该方法输出消息级的日志。
   **/
  info (...args: any[]) {
    // if ((logLevel < LogLevel['INFO'] && logLevel > LogLevel['DEBUG'] && logLevel < LogLevel['NONE']) || logLevel === LogLevel['NONE']) return;
    if ((this.logLevel > LogLevel['INFO'] && this.logLevel !== LogLevel['NONE']) || this.logLevel === LogLevel['NONE']) return;
    let params: any = args;
    let nowTime: any = Date.now();
    params.unshift(`[${timesToDate(nowTime, "YYYY-MM-DD hh:mm:ss")}] ${this.logPrefix} [INFO] - `);

    if (this.uploadServeTranslators.length > 0) {
      this.uploadServeTranslators.map(task => {
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
  }

  /**
   * 该方法输出debug级的日志。
   **/
  debug (...args: any[]) {
    if ((this.logLevel > LogLevel['DEBUG'] && this.logLevel !== LogLevel['NONE']) || this.logLevel === LogLevel['NONE']) return;
    let params: any = args;
    let nowTime: any = Date.now();
    params.unshift(`[${timesToDate(nowTime, "YYYY-MM-DD hh:mm:ss")}] ${this.logPrefix} [DEBUG] - `);

    if (this.uploadServeTranslators.length > 0) {
      this.uploadServeTranslators.map(task => {
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
  }

}
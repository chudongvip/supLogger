# supLogger

A simple logging library that provides log upload middleware. 



## Getting help?

If you having problems? You can  [create an issue]( https://github.com/chudongvip/supLogger/issues ).



## Installation

```javascript
npm install suplogger
```



## Usage

- Require or import library

```javascript
// ES6
import SupLogger from "suplogger";
// or commonjs
let SupLogger = require("suplogger");

let logger = new SupLogger();
```

- Five log levels

The log level follows the sequence DEBUG, INFO, WARNING, ERROR, and NONE. The values are 0, 1, 2, 3, 4. 

- Sets the Log Level.  

By selecting a level, you can see log information at that level and at all levels above that level. For example: 

```javascript
logger.setLogLevel(logger.WARNING);
```

then you can see logs in levels ERROR, and WARNING. The default value is `NONE` and the log is not output. 

example:

```javascript
// ES6
import SupLogger from "suplogger";
let logger = new SupLogger();
logger.setLogLevel(logger.WARNING);
logger.error("This is an error msg");
```

and you will see this on console

```
[2019-11-25 14:53:33] supLogger [ERROR] -  This is an error msg
```

if you want to remove or rename the prefix you can do this

```
logger.setLogLevel(logger.WARNING, "");
logger.error("This is an error msg");

//will output
[2019-11-25 14:53:33] [ERROR] -  This is an error msg

logger.setLogLevel(logger.WARNING, "[awsome SDK]");
logger.error("This is an error msg");

//will output
[2019-11-25 14:53:33] awsome SDK [ERROR] -  This is an error msg
```



- Log template

Default template

```javascript
[2019-11-25 14:53:33] supLogger [ERROR] -  This is an error msg
```

if you want

- Outputs Log

example

```
logger.error("This is an error msg");
logger.warning("This is an warning msg");
logger.info("This is an info msg");
logger.debug("This is an debug msg");
```

- Middleware

if want to upload all  output logs , you can create an middle-ware to help you. For example:

```javascript
/**
 * Method use accept a function as a parameter
 * Note:
 * 1. You can control whether the log is output by the next method.
 * 2. Selecting a level via setLogLevel, you can received log information at that level and at all levels above that level.
 **/
logger.use((logData, next) => {
  if (logData.type === "error") {
    // upload error log to your server and not output
    
  } else {
    // log will be output on console
		next();
  }
});
```

**Tip：** use middle-ware before call outputs function(such as logger.error、logger.info).



## Complete example

```javascript
// ES6
import supLogger from "suplogger";
let logger = new SupLogger();
// set log level
logger.setLogLevel(logger.WARNING);
// create middle-ware
logger.use((logData, next) => {
  if (logData.type === "error") {
    // upload error log to your server and not output
    
  } else {
    // log will be output on console
		next();
  }
});

// outputs log
logger.error("This is an error msg");
logger.warning("This is an warning msg");
logger.info("This is an info msg");
logger.debug("This is an debug msg");
```

you will see `This is an error msg` and `This is an warning msg` output on console tab.



## License

[check here]( https://github.com/chudongvip/supLogger/blob/master/LICENSES.txt ).
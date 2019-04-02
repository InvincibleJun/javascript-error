const log4js = require("log4js");
const logger = log4js.getLogger();

log4js.addLayout("json", function(config) {
  return function(logEvent) {
    const data = {
      time: logEvent.startTime,
      ...logEvent.data[0],
      level: logEvent.level.levelStr
    };
    return JSON.stringify(data) + config.separator;
  };
});

log4js.configure({
  appenders: {
    out: {
      type: "dateFile",
      filename: "../logs/js-error",
      pattern: "yyyy-MM-dd-hh.log",
      alwaysIncludePattern: true,
      layout: { type: "json", separator: "" }
    }
  },

  categories: {
    default: { appenders: ["out"], level: "info" }
  }
});

module.exports = {
  info(message) {
    logger.info(message);
  },
  error(message) {
    logger.error(message);
  }
};

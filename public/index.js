!(function() {
  // @type window
  var w = window,
    // @type HTMLelement
    d = document,
    // @type function 空函数
    noop = function() {},
    // @type object null
    NULL = null,
    // @type function 保留原有处理
    func = window.onerror || noop,
    // @type HTMLelement 当前脚本
    script = document.getElementById("__ERROR__"),
    // @type string 上报url
    action = script.getAttribute("action"),
    // @type 是否上报console
    includeConsole = script.hasAttribute("console"),
    // @type 使用xhr传送
    useXhr = script.hasAttribute("xhr");

  function Err() {
    this.console = NULL;
    this.userAgent = w.navigator.userAgent;
    this.init();
  }

  Err.prototype.init = function() {
    this.errorFunc();
    if (includeConsole && w.console) {
      this.console = w.console;
      w.console = this.consoleFunc();
    }
  };

  Err.prototype.consoleFunc = function() {
    // @type object this
    var self = this,
      // @type string[] console枚举
      map = ["log", "info", "error"],
      // @type object console对象
      funcs = this.console,
      // @tyoe object 缓存原始console
      tmps = {};

    for (var i = 0, l = map.length; i < l; i++) {
      tmps[map[i]] = this.console[map[i]];

      funcs[map[i]] = (function(i) {
        return function() {
          var arg = [].slice.call(arguments, 0);
          // 执行原始console
          tmps[map[i]].apply(w, arg);

          arg.splice(0, 0, map[i]);
          // // 发送
          self.send(self.makeConsoleMsg.apply(self, arg));
        };
      })(i);
    }

    return funcs;
  };

  Err.prototype.makeConsoleMsg = function() {
    var arg = arguments;
    var type = arguments[0];
    var messages = [].slice.call(arguments, 1);

    return {
      type: type.toUpperCase(),
      uuid: this.uuid(),
      createTime: +new Date(),
      path: w.location.href,
      userAgent: self.userAgent,
      console: messages
        .map(function(mes) {
          return mes.toString();
        })
        .join(",")
    };
  };

  Err.prototype.errorFunc = function() {
    var self = this;
    w.onerror = function() {
      var args = arguments;

      func.apply(null, args);
      self.send(self.makeErrorMsg.apply(self, args));
    };
  };

  Err.prototype.makeErrorMsg = function(message, source, lineno, colno, error) {
    var self = this;
    var errorData = {
      message: message,
      source: source,
      lineno: lineno,
      colno: colno,
      error: error.toString(),
      stack: error.stack
    };
    return {
      type: "ERROR",
      uuid: self.uuid(),
      createTime: +new Date(),
      error: errorData || NULL,
      path: w.location.href,
      userAgent: self.userAgent
    };
  };

  Err.prototype.send = function(data) {
    useXhr ? this.xhrSend(data) : this.imageSend(data);
  };

  Err.prototype.xhrSend = function(data) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", action, true);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.onreadystatechange = function() {};
    xhr.send(JSON.stringify(data));
  };

  Err.prototype.imageSend = function(data) {
    var image = new Image();
    var str = "message=" + encodeURIComponent(JSON.stringify(data));
    image.src = action + (action.indexOf("?") > -1 ? "&" : "?") + str;
  };

  Err.prototype.uuid = function() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid;
  };

  Err.prototype.userAgent = function() {
    return w.navigator.userAgent;
  };

  new Err();
})();

!(function() {
  // @type window
  var w = window,
    // @type HTMLelement
    d = document,
    // @type function 空函数
    noop = function() {},
    // @type object null
    NULL = null,
    // @type object null
    XHR = NULL,
    // @type function 保留原有处理
    // func = w.onerror || noop,
    // @type HTMLelement 当前脚本
    script = d.currentScript || d.scripts[0],
    // @type string 上报url
    action = 'http://61.142.132.61:10098/api/v1/front-errors',
    // @type 是否上报console
    includeConsole = script.getAttribute('console'),
    // @type string token
    token = script.getAttribute('token'),
    // @type boolean 网络状态

  function Err() {
    if (!token) {
      return console.error('未设置当前token')
    }
    this.console = NULL
    this.queue = []
    this.init()
  }

  Err.prototype.init = function() {
    this.errorFunc()
    if (includeConsole && w.console && typeof console === 'function') {
      this.console = w.console
      w.console = this.makeConsole()
    }
  }

  Err.prototype.makeConsole = function() {
    // @type object this
    var self = this,
      // @type string[] console枚举
      map = ['log', 'info', 'error'],
      // @type object console对象
      funcs = {}
    // 遍历
    for (var i = 0, l = map.length; i < l; i++) {
      funcs[map[i]] = function() {
        var arg = [].slice.call(arguments, 1)
        // 发送
        self.send(self.makeMsg([false].concat(arg)))
        // 执行原始console
        self.console[map[i]].apply(w, arg)
      }
    }
    return funcs
  }

  Err.prototype.errorFunc = function() {
    var self = this
    w.onerror = function() {
      var arg = [].slice.call(arguments, 1)
      self.send(self.makeMsg.apply(self, [true].concat(arg)))
    }
  }

  Err.prototype.makeMsg = function(isError, message, origin, lineNo, colunmNo, error) {
    var self = this,
      stack = error ? error.stack.toString() : '',
      name = error ? error.name : ''
    return this.qs({
      type: isError ? 'error' : 'console',
      token: token,
      stack: stack,
      name: name,
      message: message,
      origin: origin,
      lineNo: lineNo,
      colunmNo: colunmNo,
      location: w.location.href
    })
  }

  Err.prototype.qs = function(obj) {
    debugger
    console.log(obj)
    var tmp = []
    for (var i in obj) {
      tmp.push(i + '=' + obj[i])
    }
    return tmp.join('&')
  }

  // 队列处理，防占用
  Err.prototype.send = function(data) {
    if (!fetching) {
      this.http.call(Err, data)
    } else {
      this.queue.push(function() {
        this.http.call(Err, data)
      })
    }
  }

  Err.prototype.http = function(data) {
    var self = this
    xhr = XHR ? XHR : new XMLHttpRequest()
    xhr.open('POST', action)
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {      
          if (self.queue.length) {
            self.queue[1].call(Err)
            self.queue.splice(1)
          } else {
            self.fetching = false
          }
        } else {
          self.queue = []
          self.fetching = false
        }
      }
    }
    xhr.send(data)
    this.fetching = true
  }
  
  new Err()
  
})()

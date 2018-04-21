!function(){
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
        func = w.onerror || noop,
    // @type HTMLelement 当前脚本
        script = d.getElementById('ERROR'),
    // @type string 上报url
        action = script.getAttribute('action'),
    // @type 是否上报console
        includeConsole = script.getAttribute('console');
    
    function Err() {
        this.console = NULL;
        this.userAgent = w.navigator.userAgent;
        this.init();
    }

    Err.prototype.init = function () {
        this.errorFunc()
        if (includeConsole && w.console && typeof console === 'function') {
            this.console = w.console;
            w.console = this.consoleFunc() 
        }
    }

    Err.prototype.consoleFunc = function () {
        // @type object this
        var self = this,
        // @type string[] console枚举
            map = ['log', 'info'],
        // @type object console对象
            funcs = {}
        // 遍历
        for (var i = 0; i = map.length; i++ ) {

            funcs[map[i]] = function() {
                var arg = arguments;
                // 发送
                self.send(self.makeMsg(arg));
                // 执行原始console
                self.console[map[i]].apply(w, arg);
            }
        }
        return funcs
    }

    Err.prototype.errorFunc = function () {
        var self = this;
        w.onerror = function () {
            var arg = arguments;
            func.apply(null, arg);
            self.send(self.makeMsg.apply(self, arg));
        }
    }

    Err.prototype.makeMsg = function (message, origin, lineNo, colunmNo, error) {

        var self = this,
            stack = error.stack.toString(),
            name = error.name;

        return JSON.stringify({
            token: '5adb34e9ffb8cd25f4e4910b',
            stack: stack,
            name: name,
            message: message,
            origin: origin,
            lineNo: lineNo,
            colunmNo: colunmNo,
            // href 可变
            href: w.location.href,
            userAgent: self.userAgent
        })
    }

    Err.prototype.send = function (data) {
        xhr = XHR ? XHR : new XMLHttpRequest();
        xhr.open('POST', action, true);
        xhr.setRequestHeader('content-type', 'application/json;charset=utf-8');
        xhr.onreadystatechange = function(){};
        xhr.send(data);
    }

    Err.prototype.uuid = function () {
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
    }

    Err.prototype.userAgent = function() {
        return w.navigator.userAgent
    }

    function sendByImage() {
        var image = new Image();
        image.src = href  
    }

    new Err()
}()

alert(a)


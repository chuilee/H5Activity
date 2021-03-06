/* eslint-disable */
export default {
  /*RGB颜色转换为16进制*/
  colorHex(that) {
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(that)) {
      var aColor = that.substring(4, that.length - 1).split(",");
      var strHex = "#";
      for (var i = 0; i < aColor.length; i++) {
        var hex = Number(aColor[i]).toString(16);
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = that;
      }
      return strHex;
    } else if (reg.test(that)) {
      var aNum = that.replace(/#/, "").split("");
      if (aNum.length === 6) {
        return that;
      } else if (aNum.length === 3) {
        var numHex = "#";
        for (var i = 0; i < aNum.length; i += 1) {
          numHex += (aNum[i] + aNum[i]);
        }
        return numHex;
      }
    } else {
      return that;
    }
  },
  // 两个对象合并
  extend: function (target, source, deep) {
    var target = target || {};
    var sType = typeof source,
      i = 1,
      options;
    if (sType === 'undefined' || sType === 'boolean') {
      deep = sType === 'boolean' ? source : false;
      source = target;
      target = this;
    }
    if (typeof source !== 'object' && Object.prototype.toString.call(source) !== '[object Function]')
      source = {};
    else i = 2;
    while (i <= 2) {
      options = i === 1 ? target : source;
      if (options != null) {
        for (var name in options) {
          var src = target[name],
            copy = options[name];
          if (src === copy)
            continue;
          if (deep && copy && typeof copy === 'object' && !copy.nodeType) {
            var tempObj = JSON.parse(JSON.stringify(this.extend(src ||
              (copy.length != null ? [] : {}), copy, deep)));
            target[name] = tempObj;
          } else if (copy !== undefined)
            target[name] = copy;
        }
      }
      i++;
    }
    return target;
  },
  v_extend: function (target, source, deep, that) {
    target = target || {};
    var sType = typeof source,
      i = 1,
      options;
    if (sType === 'undefined' || sType === 'boolean') {
      deep = sType === 'boolean' ? source : false;
      source = target;
      target = this;
    }
    if (typeof source !== 'object' && Object.prototype.toString.call(source) !== '[object Function]')
      source = {};
    else i = 2;
    while (i <= 2) {
      options = i === 1 ? target : source;
      if (options != null) {
        for (var name in options) {
          var src = target[name],
            copy = options[name];
          if (src === copy) {
            continue;
          }
          if (deep && copy && typeof copy === 'object' && !copy.nodeType) {
            this.v_extend(src || (copy.length != null ? [] : {}), copy, deep, that)
          } else if (copy !== undefined) {
            if (target[name] != undefined && typeof target[name] === 'object') {
              that.$set(target[name], copy);
            } else
              target[name] = copy;
          }
        }
      }
      i++;
    }
    return target;
  },
  /**
   * 格式化日期
   *
   * @author  Siah
   *
   * @param   date
   * @param   format
   * @return  格式化过的日期 如 2020-01-01
   */
  formatDate(date, format) {
    if (!date) date = new Date();
    if (!format) format = 'yyyyMMddHHmmss';

    var year = date.getFullYear(),
      months = (date.getMonth() > 8 ? '' : '0') + (date.getMonth() + 1),
      days = (date.getDate() > 9 ? '' : '0') + date.getDate(),
      hours = (date.getHours() > 9 ? '' : '0') + date.getHours(),
      minutes = (date.getMinutes() > 9 ? '' : '0') + date.getMinutes(),
      secounds = (date.getSeconds() > 9 ? '' : '0') + date.getSeconds();

    format = format.replace(/yyyy/, year);
    format = format.replace(/MM/, months);
    format = format.replace(/dd/, days);
    format = format.replace(/HH/, hours);
    format = format.replace(/mm/, minutes);
    format = format.replace(/ss/, secounds);

    return format;
  },

  //返回一个全地址
  resolveUrl(url) {
    var a = document.createElement("a");
    a.href = url;
    return a.href;
  },

  //*************************************************
  //*                                               *
  //*                     cookie                    *
  //*                                               *
  //*************************************************
  addcookie(name, value, expireHours) {
    var cookieString = name + "=" + escape(value);
    //判断是否设置过期时间
    expireHours = expireHours || 10000;

    var date = new Date();
    date.setTime(date.getTime() + expireHours * 3600 * 1000);
    cookieString = cookieString + "; expires=" + date.toGMTString() + "; path=/";

    document.cookie = cookieString;
  },

  getcookie(name) {
    var strcookie = document.cookie;
    var arrcookie = strcookie.split("; ");
    for (var i = 0; i < arrcookie.length; i++) {
      var arr = arrcookie[i].split("=");
      if (arr[0] == name) return arr[1];
    }
    return "";
  },

  /**
   * 验证用户浏览器是否是微信浏览器
   * @author  Siah
   *
   * @return  是微信浏览器返回true否则返回false
   */
  isWeiXinFun() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  },

  /**
   * 验证用户浏览器是否是微博内置浏览器
   * @author  Siah
   *
   * @return  是微博内置浏览器返回true否则返回false
   */
  isWeibo() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/weibo/i) == 'weibo') {
      return true;
    } else {
      return false;
    }
  },

  isZhifubao() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/ali/i) == 'ali') {
      return true;
    } else {
      return false;
    }
  },

  //*************************************************
  //*                                               *
  //*                     query string              *
  //*                                               *
  //*************************************************

  getQueryStringByName(name) {
    var result = window.location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
      return "";
    }
    return decodeURIComponent(result[1]);
  },

  /**
   * 验证用户设备来源
   * @author  Siah
   *
   * @return  object
   */
  userAgent() {
    var sUserAgent = navigator.userAgent.toLowerCase();

    var o = {};
    o.isIpad = /ipad/i.test(sUserAgent);
    o.isIphone = /iphone os/i.test(sUserAgent);
    o.isUc7 = /rv:1.2.3.4/i.test(sUserAgent);
    o.isUc = /ucweb/i.test(sUserAgent);
    o.isAndroid = /android/i.test(sUserAgent);
    o.isWM = /windows mobile/i.test(sUserAgent);

    o.isPhone = o.isIphone || o.isAndroid || o.isWM || o.isUc7 || o.isUc;
    o.isMobile = o.isIpad || o.isPhone || o.isAndroid;
    o.isPc = !o.isMobile;
    o.isIOS = o.isIpad || o.isIphone;

    return o;
  },

  /**
   * JS验证邮件地址是否合法
   * @author  Siah
   *
   * @param   email
   * @return  合法返回true；不合法返回false
   */
  checkEmail(email) {
    var re = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return re.test(email);
  },

  /**
   * JS获取字符串长度(区分中英文) 中文算2个字,英文一个
   * @author  Siah
   *
   * @param   string  电话号码
   * @return 返回字符串长度
   */
  getStrLength(str) {
    var cArr = str.match(/[^\x00-\xff]/ig);
    return str.length + (cArr == null ? 0 : cArr.length);
  },

  /**
   * JS获取字符串长度(区分中英文) 中文算2个字,英文一个
   * @author  Siah
   *
   * @param   string  电话号码
   * @return 返回字符串长度
   */
  setGlobal() {
    var logoImg = document.querySelector(".wap-logo img"),
      bannerImg = document.querySelector(".wap-static-banner img");
    activityConfig = window.store.activityConfig;
    activityConfig.logo.imgH = logoImg.offsetHeight;
    activityConfig.logo.imgW = logoImg.offsetWidth;
    activityConfig.banner.imgH = bannerImg.offsetHeight;
    activityConfig.banner.imgW = bannerImg.offsetWidth;
  },
  getRem(px) {
    return (~~px.substring(0, px.length - 2) / 12) + "rem"; // rem
  },
  /**
   * 检查手机号码是否合法
   * @author  Siah
   *
   * @param   string  手机号码
   * @return 合法返回true；不合法返回flase
   */
  checkMobile(string) {
    return (/^1[3-9]+\d{9}$/.test(string));
  },

  /**
   * 验身份证号码是否正确
   * @author  Siah
   *
   * @param   num     身份证号码
   * @return 合法返回true；不合法返回flase
   */
  isIdCardNo(num) {
    var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
    var error;
    var varArray = new Array();
    var intValue;
    var lngProduct = 0;
    var intCheckDigit;
    var intStrLen = num.length;
    var idNumber = num;
    // initialize
    if ((intStrLen != 15) && (intStrLen != 18)) {
      //error = "输入身份证号码长度不对！";
      //alert(error);
      //frmAddUser.txtIDCard.focus();
      return false;
    }
    // check and set value
    for (i = 0; i < intStrLen; i++) {
      varArray[i] = idNumber.charAt(i);
      if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
        //error = "错误的身份证号码！.";
        //alert(error);
        //frmAddUser.txtIDCard.focus();
        return false;
      } else if (i < 17) {
        varArray[i] = varArray[i] * factorArr[i];
      }
    }
    if (intStrLen == 18) {
      //check date
      var date8 = idNumber.substring(6, 14);
      if (IsDate(date8) == false) {
        //error = "身份证中日期信息不正确！.";
        //alert(error);
        return false;
      }
      // calculate the sum of the products
      for (i = 0; i < 17; i++) {
        lngProduct = lngProduct + varArray[i];
      }
      // calculate the check digit
      intCheckDigit = 12 - lngProduct % 11;
      switch (intCheckDigit) {
        case 10:
          intCheckDigit = 'X';
          break;
        case 11:
          intCheckDigit = 0;
          break;
        case 12:
          intCheckDigit = 1;
          break;
      }
      // check last digit
      if (varArray[17].toUpperCase() != intCheckDigit) {
        //error = "身份证效验位错误!正确为： " + intCheckDigit + ".";
        //alert(error);
        return false;
      }
    } else { //length is 15
      //check date
      var date6 = "19" + idNumber.substring(6, 12);
      if (IsDate(date6) == false) {
        //alert("身份证日期信息有误！.");
        return false;
      }
    }
    //alert ("Correct.");
    return true;
  },

  /**
   * 随机数组
   * @author  Siah
   *
   * @param   array     原数组
   * @return 随机打乱过的数组
   */
  shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  },
  /** 异步加载外部js脚本
   * @param {string} 文件路径
   * @param {function} 加载成功回调
   * @param {function} 加载失败错误回调
   */
  requireScript(file, cb, errCb) {
    let isExist = false
    let iserror = false

    for (var i = 0, scripts = document.getElementsByTagName("script"); i < scripts.length; i++) {
      if (scripts[i].src.indexOf(file) > -1) {
        isExist = true;
        iserror = scripts[i].getAttribute('iserror')
      }
    };

    if (!isExist) {
      var newScript = document.createElement('script');
      newScript.src = file
      document.getElementsByTagName("head")[0].appendChild(newScript);

      newScript.onerror = function (e) {
        if (errCb) {
          errCb()
        }
        this.setAttribute('iserror', true)
      }

      newScript.onload = function (e) {
        this.setAttribute('iserror', false)
        cb()
      }
    } else if (iserror === 'false') {
      cb()
    } else {
      if (errCb) {
        errCb()
      }
    }
    return isExist;
  }
}

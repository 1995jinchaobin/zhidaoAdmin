'use strict'

const method = {
  /**
   * 获取浏览器标识
   * @returns {string}
   */
  getUserAgent () {
    return window.navigator.userAgent.toLowerCase()
  },
  /**
   * 获取浏览器的版本
   * @returns {string}
   */
  getAppVersion () {
    return window.navigator.appVersion
  },
  /**
   * 获取浏览器的语言信息
   * @returns {string}
   */
  getLanguage () {
    return (window.navigator.browserLanguage || window.navigator.language).toLowerCase()
  },
  /**
   * 是否为IE内核
   * @returns {boolean}
   */
  isTrident () {
    return this.getUserAgent().indexOf('trident') > -1 || this.getUserAgent().indexOf('msie') !== -1
  },
  /**
   * 是否为opera内核
   * @returns {boolean}
   */
  isPresto () {
    return this.getUserAgent().indexOf('presto') > -1
  },
  /**
   * 是否为苹果、谷歌内核
   * @returns {boolean}
   */
  isWebKit () {
    return this.getUserAgent().indexOf('applewebkit') > -1
  },
  /**
   * 是否为火狐内核
   */
  isGecko () {
    return this.getUserAgent().indexOf('gecko') > -1 && this.getUserAgent().indexOf('khtml') === -1
  },
  /**
   * 是否为移动终端
   * @returns {boolean}
   */
  isMobile () {
    return !!this.getUserAgent().match(/applewebkit.*mobile.*/)
  },
  /**
   * ios终端
   * @returns {boolean}
   */
  isIOS () {
    return !!this.getUserAgent().match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  },
  /**
   * android终端
   * @returns {boolean}
   */
  isAndroid () {
    return this.getUserAgent().indexOf('android') > -1 || this.getUserAgent().indexOf('adr') > -1
  },
  /**
   * 是否为iPhone或者QQHD浏览器
   * @returns {boolean}
   */
  isIPhone () {
    return this.getUserAgent().indexOf('iphone') > -1
  },
  /**
   * 是否iPad
   * @returns {boolean}
   */
  isIPad () {
    return this.getUserAgent().indexOf('ipad') > -1
  },
  /**
   * 是否web应该程序，没有头部与底部
   * @returns {boolean}
   */
  isWebApp () {
    return this.getUserAgent().indexOf('safari') === -1
  },
  /**
   * 是否是微信客户端
   * @returns {boolean}
   */
  isWeChat () {
    return this.getUserAgent().indexOf('microMessenger') > -1
  },
  /**
   * 是否QQ客户端
   * @returns {boolean}
   */
  isQQ () {
    return this.getUserAgent().match(/\sqq/i) === 'qq'
  },
  /**
   * 是否为mac终端
   * @returns {boolean}
   */
  isMac () {
    return /macintosh|mac os x/i.test(this.getUserAgent())
  },
  /**
   * 是否为windows终端
   * @returns {boolean}
   */
  isWindows () {
    return /windows|win32/i.test(this.getUserAgent())
  },
  /**
   * 是否为safari浏览器
   * @returns {boolean}
   */
  isSafari () {
    return /safari/i.test(this.getUserAgent()) && !/chrome/i.test(this.getUserAgent())
  }
}

const defaultMethod = {
  isTrident: () => method.isTrident(),
  isPresto: () => method.isPresto(),
  isWebKit: () => method.isWebKit(),
  isGecko: () => method.isGecko(),
  isMobile: () => method.isMobile(),
  isIOS: () => method.isIOS(),
  isAndroid: () => method.isAndroid(),
  isIPhone: () => method.isIPhone(),
  isIPad: () => method.isIPad(),
  isWebApp: () => method.isWebApp(),
  isWeChat: () => method.isWeChat(),
  isQQ: () => method.isQQ(),
  isMac: () => method.isMac(),
  isWindows: () => method.isWindows(),
  isSafari: () => method.isSafari()
}

export default defaultMethod

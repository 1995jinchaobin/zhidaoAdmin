import verification from './VerificationUtil'

/**
 * 参数
 * @type {{size: {surplus: number, max: number, use: number}}}
 */
let param = {
  /**
   * 是否使用前缀
   */
  LOCAL_STORAGE_PREFIX: 'bolema_s_',
  /**
   * 缓存测试变量
   */
  LOCAL_STORAGE_PARAM: 'local_storage_info',
  // localStorage缓存空间大小
  size: {
    max: 0,
    use: 0,
    surplus: 0
  }
}

/**
 * 方法
 * @type {{getObjectSize(*=): (*|number), getSurplusSize(): (undefined), getMaxSize(): number, set(*=, *=): boolean, isFlag(): boolean, getStringSize(*=): number, getUseSize(): (undefined), remove(*=): boolean}}
 */
const baseMethod = {
  /**
   * 获取参数
   * @return {{size: {surplus: number, max: number, use: number}}}
   */
  getParam () {
    return param
  },
  /**
   * 验证当前浏览器是否支持使用localStorage
   * @returns {boolean}
   */
  isFlag () {
    if (!window.localStorage) {
      console.log('当前浏览器不支持localStorage!')
      return true
    }
    return false
  },
  /**
   * 获取最大的缓存空间
   * @returns {number}
   */
  getMaxSize () {
    param.size.max = param.size.use + param.size.surplus
    return param.size.max
  },
  /**
   * 获取当前使用的缓存空间
   */
  getUseSize () {
    if (this.isFlag()) {
      return
    }
    let size = 0
    for (let item in window.localStorage) {
      if (window.localStorage.hasOwnProperty(item)) {
        size += window.localStorage.getItem(item).length
      }
    }
    param.size.use = size
    console.log('当前localStorage使用容量为' + (size / 1024).toFixed(2) + 'KB')
  },
  // 获取剩余的缓存空间
  /*
     一般来说浏览器的 localStorage 缓存大小为 5MB
     先验证1MB的数据
     循环到1字节
     */
  getSurplusSize () {
    if (this.isFlag()) {
      return
    }
    let initDataSize = '0'
    // --1Byte的数据
    for (let i = 0; i < 10; i++) {
      initDataSize += initDataSize
    }
    // --1KB的数据
    for (let i = 0; i < 10; i++) {
      initDataSize += initDataSize
    }
    // --1MB的数据
    let sum = initDataSize
    let interval = setInterval(() => {
      try {
        window.localStorage.removeItem('cache_test')
        window.localStorage.setItem('cache_test', sum)
        sum += initDataSize
      } catch (e) {
        // 如果还没有到1Byte 则继续
        // console.log(initDataSize.length);
        if (initDataSize.length > 1) {
          // 截取到之前一次的长度
          sum = sum.substr(initDataSize.length / 2, sum.length)
          // 获取一半的长度
          initDataSize = initDataSize.substr(0, initDataSize.length / 2)
          // console.log('异常后的长度：' + sum.length / 1024+ 'KB');
          // sum += initDataSize;
        } else {
          param.size.surplus = sum.length
          console.log('浏览器localStorage最大空间为：' + (sum.length / 1024).toFixed(2) + 'KB')
          // 关闭循环
          clearInterval(interval)
        }
      }
    }, 0.1)
  },
  /**
   * 获取字符串的字节大小
   * @param content
   * @returns {number}
   */
  getStringSize (content = '') {
    // 原来的字符串长度（包括双字节字符）
    let initSize = content.length
    // 获取去除双字节字符的长度
    // eslint-disable-next-line
    let charSize = content.replace(/[^\x00-\xff]/g, '').length
    // 差值
    let bit = initSize - charSize
    return bit + initSize
  },
  /**
   * 获取对象的字节大小
   * @param object
   * @returns {*|number}
   */
  getObjectSize (object = '') {
    let string = ''
    if (!verification.isString(object)) {
      string = JSON.stringify(object)
    } else {
      string = object
    }
    return this.getStringSize(string)
  },
  /**
   * 获取键名称
   * @param key
   * @returns {string}
   */
  getKey (key = '') {
    if (param.LOCAL_STORAGE_PREFIX) {
      key = param.LOCAL_STORAGE_PREFIX + key
    }
    return key
  },
  /**
   * 存值
   * @param key
   * @param object
   * @returns {boolean}
   */
  set (key, object) {
    let string = ''
    if (!verification.isString(object)) {
      string = JSON.stringify(object)
    } else {
      string = object
    }
    try {
      let size = this.getStringSize(string)
      localStorage.setItem(this.getKey(key), string)
      param.size.surplus -= size
      return true
    } catch (e) {
      alert('浏览器缓存空间不足')
      return false
    }
  },
  /**
   * 移除
   * @param key
   */
  remove (key) {
    let object = localStorage.getItem(this.getKey(key))
    if (object) {
      let size = this.getObjectSize(object)
      param.size.surplus += size
    }
    return true
  },
  // 获取值
  get (name = null) {
    if (!name) {
      return null
    }
    let string = localStorage.getItem(this.getKey(name))
    if (string) {
      string = JSON.parse(string)
    }
    return string
  },
  /**
   * 获取缓存基本信息
   */
  getLocalStorageInfo () {
    const temp = this.get(param.LOCAL_STORAGE_PARAM)
    console.log(temp)
    if (!temp) {
      // 计算属性
      this.getUseSize()
      this.getSurplusSize()
      this.getMaxSize()
      setTimeout(() => {
        // console.log(params.size)
        this.set(param.LOCAL_STORAGE_PARAM, param.size)
      }, 10000)
    } else {
      param.size = temp
    }
  }
}

/**
 * 通用方法
 * @type {{storage(*=, *=): *}}
 */
export default {
  /**
   * 设置
   * @param name
   * @param value
   * @returns {*}
   */
  set (name = null, value = null) {
    // baseMethod.getLocalStorageInfo();
    if (!name && !value) {
      return false
    }
    return baseMethod.set(name, value)
  },
  // 获取值
  get (name = null) {
    return baseMethod.get(name)
  },
  /**
   * 调用浏览器缓存
   * @param name
   * @param value
   * @returns {*}
   */
  storage (name = null, value = null) {
    if (name && value) {
      return false
    }
    // 如果value为空， 则表示获取这个key的值
    if (!value) {
      let string = localStorage.getItem(name)
      return JSON.parse(string)
    }
    return baseMethod.set(name, value)
  }
}

// 引入axios
import axios from 'axios'
// 引入xhr参数信息
import param from './XhrParam'
// 引入message消息提示
import messageUtil from '../MessageUtil'
// 引入mask遮罩层
import maskUtil from '../MaskUtil'
axios.defaults.withCredentials = true;

const defaultParam = {
  /**
   * 默认几种请求方法的前缀
   */
  METHOD_PREFIX: 'request',
  /**
   * 请求时的处理方法
   */
  DEFAULT_REQUEST: {
    /**
     * 遮罩层参数
     */
    mask: {
      close: true
    },
    /**
     * 异常处理函数
     */
    error: null
  }
}

/**
 * 创建axios对象实例
 * @type {AxiosInstance}
 */
let instance = axios.create({
  baseURL: param.BASE_HTTP,
  //baseURL: '/ycBg'
  // HEADER: {
  //     'Access-Control-Allow-Credentials': true,
  //     'Access-Control-Allow-Origin': '*'
  // }
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

// 启用身份验证
instance.defaults.withCredentials = true

let defaultMethod = {
  /**
   * 获取axios对象
   * @param that
   * @param url
   * @param params
   * @param method
   * @param responseType
   * @returns {*}
   */
  getAxiosObject ({url = '', params = {}, method = param.RequestMethod.GET, responseType = param.ResponseType.JSON}) {
    const object = {
      method,
      url,
      headers: param.HEADER,
      withCredentials: true,
      responseType
    }
    // 如果是POST请求，post请求要用formData传值
    if (method.toLowerCase() === param.RequestMethod.POST) {
      let formData = new FormData()
      Object.keys(params).forEach((key) => {
        formData.append(key, params[key])
      })
      // for (let value of formData.values()){
      //   console.log(value)
      // }
      object['data'] = formData
    } else {
      object['params'] = params
    }
    // console.log(object)
    return instance(object)
  },
  /**
   * xhr请求
   * @param that
   * @param url
   * @param params
   * @param success
   * @param method
   * @param responseType
   * @param mask
   */
  xhr ({that, url = '', params = {}, success = null, method = param.RequestMethod.GET, responseType = param.ResponseType.JSON, other}) {
    const object = this.getAxiosObject({url, params, method, responseType})
    this.baseXhr({
      that,
      axiosList: [object],
      success,
      other
    })
  },
  /**
   * 并发请求（多个请求，注意自己处理异常信息）
   * @param that
   * @param axiosList
   * @param success
   * @param other 默认位一个空对象
   */
  baseXhr ({that, axiosList = [], success = null, other = defaultParam.DEFAULT_REQUEST}) {
    // 打开遮罩层
    if (other.mask) { maskUtil.open()}
    if (!(axiosList instanceof Array) || axiosList.length === 0) {
      // console.log('请求异常')
      return
    }
    // 如果axiosList的长度为1，执行单个请求的方法
    let axiosObject
    if (axiosList.length > 1) {
      axiosObject = axios.all(axiosList).then(axios.spread(function (...response) {
        console.log(response,'response1');
        success(...response.map(function (r) {
          return r.data
        }))
        // 关闭遮罩层
        if (other.mask && other.mask.close) { maskUtil.close() }
      }))
    } else {
      // 单个请求
      axiosObject = axiosList[0].then(function (response) {
        if (response.data.code < 0) {
          if (other.mask) { maskUtil.close() }
          messageUtil.message.error(response.data.message)
        } else {
          if (response.data.code === 9) {
            // 未登录
            messageUtil.message.error(response.data.message)
            that.$router.push({path: '/'})
          } else if (response.data.code === 8) {
            // 无权限
            messageUtil.message.error(response.data.message)
          } else if (response.data.code === 7) {
            // 重复提交
            messageUtil.message.error('请勿重复提交')
          }else {
            success(response.data)
          }
          //success(response.data)
        }
        // 关闭遮罩层
        if (other.mask && other.mask.close) { maskUtil.close() }
      })
    }
    // 异常处理
    axiosObject.catch((error) => {
      //如果遮罩层已经打开，则先关闭遮罩层
      if (other.mask) { maskUtil.close() }
      if (other.error) {
        other.error(error)
      } else {
        // 异常信息
        if (error.response) {
          messageUtil.message.error('请联系管理员，并告诉他系统出错如下：' + error.response.data.message)
        }
      }
      // console.log(error.config)
    })
  },
  /**
   * 初始化
   */
  init () {
    // 初始化四种封装的请求方法 Get Post Delete Put
    // 遍历requestMethod对象进行新建方法
    Object.keys(param.RequestMethod).forEach(function (m) {
      let methodName = m.toLowerCase()
      if (defaultParam.METHOD_PREFIX) {
        let tempArray = methodName.split('')
        tempArray[0] = tempArray[0].toUpperCase()
        methodName = defaultParam.METHOD_PREFIX + tempArray.join('')
      }
      exportMethod[methodName] = function ({that, method = m, url, data, params, success, responseType = param.ResponseType.JSON, other = defaultParam.DEFAULT_REQUEST}) {
        defaultMethod.xhr({that, method, url, data, params, success, responseType, other})
      }
    })
  }
}

let exportMethod = {
  /**
   * 获取参数
   * @return {{RequestMethod: {DELETE: string, POST: string, GET: string, PUT: string}, BASE_HTTP: string, HEADER: {}, ResponseType: {BLOB: string, NULL: string, JSON: string, TEXT: string}}}
   */
  getParam () {
    return param
  },
  /**
   * 获取ajax请求对象
   * @param method
   * @param url
   * @param params
   * @param responseType
   * @returns {*}
   */
  requestObject (method, url, params, responseType) {
    return defaultMethod.getAxiosObject({url, params, method, responseType})
  },
  /**
   * 并发请求处理
   * @param that
   * @param axiosList
   * @param success
   * @param other
   */
  requestAll (that, axiosList, success, other) {
    defaultMethod.baseXhr({that, axiosList, success, other})
  },
  /**
   * ajax请求
   * @param that
   * @param method
   * @param url
   * @param params
   * @param success
   * @param responseType
   * @param other
   */
  request (that, method, url, params, success, responseType, other) {
    defaultMethod.xhr({that, method, url, params, success, responseType, other})
  },
  /**
   * 上传文件
   * @param that
   * @param url
   * @param data
   * @param success
   * @param other
   */
  uploadFile (that, url, data, success, other) {
    let formData = new FormData()
    Object.keys(data).forEach(function (key) {
      formData.append(key, data[key])
    })
    defaultMethod.xhr({
      that,
      method: param.RequestMethod.POST,
      url,
      params: formData,
      success,
      other
    })
  }
}

// 初始化对象中的方法
defaultMethod.init()

// 导出
export default exportMethod

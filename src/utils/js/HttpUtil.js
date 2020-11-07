import $http from './xhr/AxiosUtil'

export default {
  /**
   * 获取参数
   * @return {{RequestMethod: {DELETE: string, POST: string, GET: string, PUT: string}, BASE_HTTP: string, HEADER: {}, ResponseType: {BLOB: string, NULL: string, JSON: string, TEXT: string}}}
   */
  getParam () {
    return $http.getParam()
  },
  /**
   * ajaxPost请求
   * @param that
   * @param url
   * @param params
   * @param success
   * @param responseType
   * @param other
   */
  xhrPost (that, url, params, success, responseType, other) {
    $http.requestPost({that, url, params, success, responseType, other})
  },
  /**
   * ajaxGet请求
   * @param that
   * @param url
   * @param params
   * @param success
   * @param responseType
   * @param other
   */
  xhrGet (that, url, params, success, responseType, other) {
    $http.requestGet({that, url, params, success, responseType, other})
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
  xhr (that, method, url, params, success, responseType, other) {
    $http.request(that, method, url, params, success, responseType, other)
  },
  /**
   * 获取请求对象
   * @param method
   * @param url
   * @param params
   * @param responseType
   * @returns {*}
   */
  xhrObject (method, url, params, responseType) {
    return $http.requestObject(method, url, params, responseType)
  },
  /**
   * 并发请求处理
   * @param that
   * @param functionArray
   * @param success
   * @param other
   */
  xhrAll (that, functionArray = [], success = null, other) {
    $http.requestAll(that, functionArray, success, other)
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
    $http.uploadFile(that, url, data, success, other)
  }
}

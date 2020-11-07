/**
 * 参数信息
 * @type {{RequestMethod: {DELETE: string, POST: string, GET: string, PUT: string}, BASE_HTTP: string, HEADER: {}, ResponseType: {BLOB: string, NULL: string, JSON: string, TEXT: string}}}
 */
export default {
  /**
   * 请求方式
   */
  RequestMethod: {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
  },
  /**
   * 响应类型
   */
  ResponseType: {
    NULL: '',
    JSON: 'json',
    TEXT: 'text',
    BLOB: 'blob'
  },
  /**
   * 默认请求地址
   */
  BASE_HTTP: `http://192.168.1.115:8888`,
  // BASE_HTTP: `http://127.0.0.1:80`,
  // BASE_HTTP: `/ycapi`,

  /**
   * 默认请求头参数
   */
  HEADER: {
    'Content-Type':'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': 'http://47.111.6.13:80',
    'Accept':'text/Html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Access-Control-Allow-Credentials': true,
    // 'Access-Control-Allow-Origin': '*'
  }
}

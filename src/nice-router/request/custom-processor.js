import _ from 'lodash'

const systemErrorXClass = 'NetworkException.RetryPage'

const CustomProcessor = async (chain) => {
  const { headers: requestHeaders, ...others } = chain.requestParams

  // 注意request 中使用 header，在应用中使用的是headers，
  return chain
    .proceed({
      ...others,
      header: requestHeaders,
    })
    .then(async (resp) => {
      // 注意这里的taro 原生的http中使用的header是就叫header，其实是headers
      const { header, statusText, status, data } = resp

      const responseHeaders = {}
      _.keys(header).map((key) => {
        responseHeaders[key.toLocaleLowerCase()] = header[key]
      })

      const xclass = _.get(responseHeaders, 'x-class', '')
      const xredirect = _.get(responseHeaders, 'x-redirect', '')
      // 返回response的body是对象，并且xclass不是Exception结尾，那么应该就是正常 biz的数据
      const success = _.isObjectLike(data) && !xclass.endsWith('Exception')
      return {
        xclass,
        xredirect,
        data,
        message: statusText,
        status,
        headers: responseHeaders,
        success,
      }
    })
    .catch((error) => {
      const { errMsg } = error
      console.error('Request error', error)
      return {
        xclass: systemErrorXClass,
        message: `error code:${errMsg}`,
        data: {
          ...(error.response || {}),
        },
      }
    })
}

export default CustomProcessor

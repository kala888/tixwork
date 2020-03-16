import keys from 'lodash/keys'
import isObjectLike from 'lodash/isObjectLike'

const processCustom = async (chain) => {
  const { requestParams } = chain

  return chain.proceed(requestParams).then(async (resp) => {
    const { header, statusText, status, data } = resp

    const headers = {}
    keys(header).map((key) => {
      headers[key.toLocaleLowerCase()] = header[key]
    })

    const xclass = headers['x-class']
    const xredirect = headers['x-redirect']
    // 返回response的body是对象，并且xclass不是Exception结尾，那么应该就是正常 biz的数据
    const success = isObjectLike(data) && !xclass.endsWith('Exception')
    return {
      xclass,
      xredirect,
      data,
      message: statusText,
      status,
      headers,
      success,
    }
  })
}

export default processCustom

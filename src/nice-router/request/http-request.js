import Taro from '@tarojs/taro'
import processOptions from '../request/process-options'
import processAuth from '../request/process-auth'
import processLoadingAndLogs from '../request/process-loading-and-logs'
import processCustom from '../request/process-custom'
import { log } from '../nice-router-util'

const interceptors = [
  processOptions,
  processAuth,
  processLoadingAndLogs,
  processCustom,
  Taro.interceptors.logInterceptor,
]

interceptors.forEach((interceptorItem) => Taro.addInterceptor(interceptorItem))

class httpRequest {
  async send(options = {}, loading) {
    log('http-request', options)
    return Taro.request({ ...options, loading })
  }
}

export default new httpRequest()

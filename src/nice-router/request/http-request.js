import Taro from '@tarojs/taro'
import { log } from '../nice-router-util'
import AuthTokenProcessor from './auth-token-processor'
import customProcessor from './custom-processor'
import loadingAndLogsProcessor from './loading-and-logs-processor'
import OptionsProcessor from './options-processor'

const interceptors = [
  OptionsProcessor,
  AuthTokenProcessor,
  loadingAndLogsProcessor,
  customProcessor,
  Taro.interceptors.logInterceptor,
]

interceptors.forEach((interceptorItem) => Taro.addInterceptor(interceptorItem))

class httpRequest {
  async send(options = {}, loading) {
    log('http-request options', options)
    return Taro.request({ ...options, loading })
  }
}

export default new httpRequest()

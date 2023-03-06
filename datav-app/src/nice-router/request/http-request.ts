import request from 'umi-request'
import OptionsProcessor from './options-processor'
import AuthTokenProcessor from './auth-token-processor'
import LoadingAndLogsProcessor from '@/nice-router/request/loading-and-logs-processor'
import CustomProcessor from '@/nice-router/request/custom-processor'

request.interceptors.request.use(OptionsProcessor)
request.use(AuthTokenProcessor)
request.use(LoadingAndLogsProcessor)
request.use(CustomProcessor)


const httpRequest = {
  async send(options, loading) {
    console.log('http-request options', options)
    const { uri, ...rest } = options
    return request(uri, { ...rest, loading })
  },
}

export default httpRequest

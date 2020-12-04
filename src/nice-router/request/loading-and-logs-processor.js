import GlobalToast from '@/nice-router/global-toast'
import { isNotEmpty, LoadingType } from '@/nice-router/nice-router-util'
import OverlayLoading from '@/nice-router/overlay-loading'
import ViewmappingService from '@/nice-router/viewmapping-service'
import Taro from '@tarojs/taro'

const systemErrorXClass = 'com.terapico.caf.local.NetworkException'

function showLoading(loading) {
  if (loading === LoadingType.modal) {
    OverlayLoading.showLoadingModal()
  }
  if (loading === LoadingType.barLoading) {
    Taro.showNavigationBarLoading()
  }
}

async function hideLoading(loading) {
  if (loading === LoadingType.modal) {
    OverlayLoading.hideLoadingModal()
  }
  if (loading === LoadingType.barLoading) {
    Taro.hideNavigationBarLoading()
  }
}

function showError({ xclass, data = {} }) {
  console.error('request got error', xclass, data)

  const view = ViewmappingService.getView(xclass)
  // 系统错误，根据xclass跳转页面
  if (xclass === systemErrorXClass || isNotEmpty(view)) {
    return
  }

  const { localizedMessage, messageList = [], message } = data

  const text = localizedMessage || message || messageList.map((msg) => msg.body).join('\n')
  if (isNotEmpty(text)) {
    GlobalToast.show({ text, duration: 5000 })
    return
  }
  // 开发环境，如果没有配置 本地错误，
  if (process.env.NODE_ENV === 'development') {
    GlobalToast.show({ text: `开发环境：错误信息:${JSON.stringify(data)}`, duration: 5000 })
  }
}

const LoadingAndLogsProcessor = (chain) => {
  const { requestParams } = chain
  const { loading } = requestParams
  showLoading(loading)

  return chain.proceed(requestParams).then(async (resp) => {
    const { success, headers = {}, data } = resp
    await hideLoading(loading)

    if (!success) {
      showError(resp)
    }
    console.log('%c****************************', 'color:#40aad8')
    console.log('%c*  request Option:', 'color:#40aad8', requestParams)
    console.log('')
    console.log('%c*  X-Class:', 'color:#40aad8', headers['x-class'])
    console.log('%c*  X-Env-Type:', 'color:#40aad8', headers['x-env-type'])
    console.log('%c*  JSON Data:', 'color:#40aad8', data)
    console.log('%c****************************', 'color:#40aad8')
    return resp
  })
}

export default LoadingAndLogsProcessor

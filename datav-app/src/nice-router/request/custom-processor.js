import _ from 'lodash'
import GlobalToast from '@/nice-router/global-toast'


let latestTipsTime = new Date()

const CustomProcessor = async (ctx, next) => {
  try {
    const start = new Date().getTime()
    await next()
    const end = new Date().getTime()
    // if ((end - start) > 100 && (end - latestTipsTime) > 1000) {
    if (end - start > 5000 && end - latestTipsTime > 300000) {
      latestTipsTime = end
      GlobalToast.show({ text: '您的网络很慢, 请优化.', duration: 1000 })
    }
    const { data, response } = ctx.res
    const { headers: headersMap, statusText, status } = response
    const headers = headersMap.map

    const xClass = _.get(headers, 'x-class', '')
    const xNavigationMethod = _.get(headers, 'x-navigation-method')
    // 返回response的body是对象，并且xClass不是Exception结尾，那么应该就是正常 biz的数据
    const success = _.isObjectLike(data) && !xClass.endsWith('Exception')
    ctx.res = {
      xClass,
      xNavigationMethod,
      data,
      message: statusText,
      status,
      success,
      headers,
    }
  } catch (error) {
    console.log('processor,Request error', error)
    GlobalToast.show({ text: '网络异常，请稍后再试' })
    ctx.res = {
      // xClass: systemErrorXClass, // 谨慎测试。离线状态，应该干掉这个功能
      message: `error code:${JSON.stringify(error)}`,
      success: false,
      data: {
        ...(error.response || {}),
      },
    }
  }
}

export default CustomProcessor

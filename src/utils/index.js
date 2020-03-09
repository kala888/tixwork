import Taro from '@tarojs/taro'
import m_ from '@/utils/mini-lodash'
import NavigationService from '@/nice-router/navigation.service'
import { LoadingType } from '@/nice-router/nice-router-util'

let device = {}

function getDevice() {
  if (m_.isEmpty(device)) {
    const res = Taro.getSystemInfoSync()
    device = res
  }
  return device
}

export function toRpx(num) {
  // Taro.pxTransform
  if (m_.isNumber(num)) {
    const width = getDeviceWidth()
    const result = (num * (750 / width)).toFixed(2)
    return `${result}rpx`
  }
  return num
}

export function getDeviceWidth() {
  const res = getDevice()
  return res.windowWidth
}

export function getDeviceHeight() {
  const res = getDevice()
  return res.windowHeight
}

export function enrichListOfEntity({ dataContainer, targetList = [], root = {} }, ...names) {
  let refsEntityContainer = dataContainer
  if (!refsEntityContainer) {
    refsEntityContainer = root.dataContainer
  }
  if (!refsEntityContainer || (m_.isEmpty(refsEntityContainer) && !m_.isEmpty(targetList))) {
    console.log('data container is empty, and target is not empty, return itself')
    return targetList
  }
  const doEnrichment = (list) => list.map((ref) => refsEntityContainer[ref.id]).filter((it) => it)
  if (names.length === 0) {
    return targetList ? doEnrichment(targetList) : []
  }
  const tempObj = {}
  m_.forEach(names, (it) => {
    const list = root[it] || []
    if (list.length > 0) {
      tempObj[it] = doEnrichment(list)
    }
  })
  return tempObj
}

function dateFormat(t, fmt) {
  var o = {
    'M+': t.getMonth() + 1, //月份
    'd+': t.getDate(), //日
    'h+': t.getHours(), //小时
    'm+': t.getMinutes(), //分
    's+': t.getSeconds(), //秒
    'q+': Math.floor((t.getMonth() + 3) / 3), //季度
    S: t.getMilliseconds(), //毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (t.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return fmt
}

export function formatTime(time, fmt = 'yyyy-MM-dd') {
  if (time) {
    return dateFormat(new Date(time), fmt)
  }
  return ''
}

export function formatMoney(money) {
  if (m_.isNumber(money)) {
    return money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  }
  return money
}

export function ajaxPullDownRefresh(action) {
  NavigationService.ajax(
    action,
    {},
    {
      onSuccess: () => Taro.stopPullDownRefresh(),
      loading: LoadingType.modal,
    }
  )
}

// export function transCandidateValuesToRange(field = {}) {
//   const candidateValues=field.candidateValues||field
//   const values = []
//   m_.forEach(candidateValues, (key, value) => values.push({ title: key, value }))
//   return values
// }

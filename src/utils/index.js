import Taro from '@tarojs/taro'
import m_ from '@/utils/mini-lodash'
import NavigationService from '@/nice-router/navigation.service'
import { isEmpty, isNotEmpty, LoadingType } from '@/nice-router/nice-router-util'

let device = {}

function getDevice() {
  if (isEmpty(device)) {
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
  if (!refsEntityContainer || (isEmpty(refsEntityContainer) && isNotEmpty(targetList))) {
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

function dateFormat(time, fmt) {
  const values = {
    'M+': time.getMonth() + 1, //月份
    'd+': time.getDate(), //日
    'H+': time.getHours(), //小时
    'h+': time.getHours() % 12, //小时
    'm+': time.getMinutes(), //分
    's+': time.getSeconds(), //秒
    'q+': Math.floor((time.getMonth() + 3) / 3), //季度
    S: time.getMilliseconds(), //毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const key in values) {
    if (new RegExp('(' + key + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? values[key] : ('00' + values[key]).substr(('' + values[key]).length)
      )
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

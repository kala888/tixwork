import { isEmpty, isNotEmpty } from '@/nice-router/nice-router-util'
import Taro from '@tarojs/taro'
import _ from 'lodash'

let device = {}

function getDevice() {
  if (isEmpty(device)) {
    device = Taro.getSystemInfoSync()
  }
  return device
}

export function toRpx(num) {
  // Taro.pxTransform
  if (_.isNumber(num)) {
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
  _.forEach(names, (it) => {
    const list = root[it] || []
    if (list.length > 0) {
      tempObj[it] = doEnrichment(list)
    }
  })
  return tempObj
}

//坑！！ ios只能识别yyyy/MM/dd hh:mm:ss
export function transToDate(value) {
  if (_.isDate(value) || isEmpty(value)) {
    return value
  }
  let temp = value
  if (_.isString(value)) {
    temp = value.replace(/-/g, '/')
  }
  const dateValue = new Date(temp)

  console.log(
    'transToDate',
    value,
    '=>',
    dateValue,
    'dateValue instanceof Date?',
    dateValue instanceof Date
    // 'NaN?', !_.isNaN(dateValue.getTime()),
  )

  const ifDateType = dateValue instanceof Date && !_.isNaN(dateValue.getTime())
  return ifDateType ? dateValue : null
}

function dateFormat(dateTime, fmt) {
  let time = transToDate(dateTime)
  if (!_.isDate(time)) {
    return dateTime
  }
  const values = {
    'M+': time.getMonth() + 1, //月份
    'd+': time.getDate(), //日
    'D+': time.getDate(), //日
    'H+': time.getHours(), //小时
    'h+': time.getHours() % 12, //小时
    'm+': time.getMinutes(), //分
    's+': time.getSeconds(), //秒
    'q+': Math.floor((time.getMonth() + 3) / 3), //季度
    S: time.getMilliseconds(), //毫秒
  }
  if (/([y,Y]+)/.test(fmt)) {
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
  if (isEmpty(money)) {
    return ''
  }
  if (_.isNumber(money)) {
    return money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  }
  return money
}

export function isH5() {
  return Taro.getEnv() === Taro.ENV_TYPE.WEB
}

export function isWeapp() {
  return Taro.getEnv() === Taro.ENV_TYPE.WEAPP
}

export function isDevEnv() {
  return process.env.NODE_ENV === 'development'
}

export function removeOrPush(list = [], item, withClone = false) {
  if (!_.isArray(list)) {
    console.warn('the list shou be array')
    return []
  }
  const result = withClone ? _.clone(list) : list
  const target = _.remove(result, item)
  if (target.length === 0) {
    result.push(item)
  }
  return result
}

export function getGroupList(items = []) {
  const groupList = []
  _.forEach(items, (it, idx) => {
    const { group = '' } = it
    let theGroup = _.find(groupList, { title: group })
    if (isEmpty(theGroup)) {
      theGroup = {
        id: idx,
        title: group,
        items: [],
      }
      groupList.push(theGroup)
    }
    theGroup.items.push({ id: idx, ...it })
  })
  return groupList
}

export function getGroupListByColumn(items = [], columnNum = 3) {
  const data = items.map((it, idx) => ({ id: idx, ...it }))
  const groupList = _.chunk(data, columnNum)
  return groupList.map((list, idx) => ({ id: idx, list }))
}

export function diffTime(end, start = Date.now()) {
  const dateDiff = end - start
  if (_.isNaN(dateDiff)) {
    return ''
  }

  const dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)) //计算出相差天数
  const leave1 = dateDiff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
  const hours = Math.floor(leave1 / (3600 * 1000)) //计算出小时数
  //计算相差分钟数
  const leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
  const minutes = Math.floor(leave2 / (60 * 1000)) //计算相差分钟数
  //计算相差秒数
  const leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
  const seconds = Math.round(leave3 / 1000)

  const result = []
  if (dayDiff > 0) {
    result.push(`${dayDiff}天`)
  }
  if (hours > 0) {
    result.push(`${hours}时`)
  }
  if (minutes > 0) {
    result.push(`${minutes}分`)
  }
  if (seconds > 0) {
    result.push(`${seconds}秒`)
  }
  return result.join('')
}

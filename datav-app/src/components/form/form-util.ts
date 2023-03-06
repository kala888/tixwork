import _ from 'lodash'

function getValue(fileValue) {
  let value = fileValue
  if (fileValue && _.isObject(fileValue.target)) {
    value = fileValue.target.value
  }
  return value
}

const VerticalField = {
  inline: false,
}
const BaseField = {
  // disabled:true
}
const fieldConfig = {
  textarea: VerticalField,
  'long-text': VerticalField,
  image: VerticalField,
  checkbox: VerticalField,
  radio: VerticalField,
  'analyze-work-list': VerticalField,
}

function mergeConfig(field) {
  // 注意使用merge的时候，是后面的merge到前面的对象上，所有不会新增对象，
  // 前面的对象如果是global，有单例问题
  return _.merge({}, BaseField, fieldConfig[field.type], field)
}

const FormUtil = {
  mergeConfig,
  getValue,
}


export function getDisplayValue(value) {
  if (value?.title) {
    return value.title
  }
  if (typeof value === 'string') {
    return value
  }
  if (Array.isArray(value)) {
    return value.map(it => it.title || it).join('-')
  }
  return JSON.stringify(value)
}


export default FormUtil

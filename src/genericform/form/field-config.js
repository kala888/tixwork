import merge from 'lodash/merge'

const verticalField = {
  layout: 'vertical',
  showTail: false,
}
const fieldConfig = {
  textarea: verticalField,
  longtext: verticalField,
  image: verticalField,
}

export default function mergeConfig(field) {
  // 注意使用merge的时候，是后面的merge到前面的对象上，所有不会新增对象，
  // 前面的对象如果是global，有单例问题
  return merge({}, fieldConfig[field.type], field)
}

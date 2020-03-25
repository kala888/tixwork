import merge from 'lodash/merge'

const fieldConfig = {
  textarea: {
    layout: 'vertical',
    showTail: false,
  },
  longtext: {
    layout: 'vertical',
    showTail: false,
  },
  image: {
    layout: 'vertical',
    showTail: false,
  },
}

export default function mergeConfig(field) {
  // 注意使用merge的时候，是后面的merge到前面的对象上，所有不会新增对象，
  // 前面的对象如果是global，有单例问题
  return merge({}, fieldConfig[field.type], field)
}

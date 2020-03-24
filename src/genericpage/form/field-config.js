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
  return merge({}, fieldConfig[field.type], field)
}

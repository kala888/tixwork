import { isNotEmpty } from '@/nice-router/nice-router-util'

const SHOW_AS_MULTIPLE_LINE = ['image', 'image-list']

export function isMultiline(item = {}) {
  const { value = '', multiline, type } = item
  if (isNotEmpty(multiline)) {
    return multiline
  }
  if (Array.isArray(value)) {
    return true
  }
  // if (type === 'longtext' && value.length < 10) {
  //   return false
  // }
  return SHOW_AS_MULTIPLE_LINE.includes(type)
  // return _.isString(value) ? value.length > 20
}

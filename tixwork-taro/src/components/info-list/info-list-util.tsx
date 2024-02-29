import ObjectUtils from '@/utils/object-utils';

const SHOW_AS_MULTIPLE_LINE = ['image', 'image-list'];

export function isMultiline({
  value = '',
  multiline,
  type = '',
}: {
  value?: any;
  multiline?: boolean;
  type?: string;
}): boolean {
  if (ObjectUtils.isNotEmpty(multiline)) {
    return !!multiline;
  }
  if (Array.isArray(value)) {
    return true;
  }
  // if (type === 'longtext' && value.length < 10) {
  //   return false
  // }
  return SHOW_AS_MULTIPLE_LINE.includes(type);
  // return _.isString(value) ? value.length > 20
}

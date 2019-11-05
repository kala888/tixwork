// linux 命令 find ./src |xargs grep  "_\." |awk -F "_." '{print $2}'|awk -F "(" '{print "import "$1" from \"lodash/"$1"\""}'| sort |uniq >a.tx
import cloneDeep from 'lodash/cloneDeep'
import concat from 'lodash/concat'
import curryRight from 'lodash/curryRight'
import debounce from 'lodash/debounce'
import findIndex from 'lodash/findIndex'
import forEach from 'lodash/forEach'
import forIn from 'lodash/forIn'
import get from 'lodash/get'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'
import isNumber from 'lodash/isNumber'
import isObject from 'lodash/isObject'
import isObjectLike from 'lodash/isObjectLike'
import isString from 'lodash/isString'
import isUndefined from 'lodash/isUndefined'
import keys from 'lodash/keys'
import last from 'lodash/last'
import memoize from 'lodash/memoize'
import merge from 'lodash/merge'
import mergeWith from 'lodash/mergeWith'
import slice from 'lodash/slice'
import split from 'lodash/split'
import startsWith from 'lodash/startsWith'
import toLower from 'lodash/toLower'
import trim from 'lodash/trim'
import unset from 'lodash/unset'
import values from 'lodash/values'
import min from 'lodash/min'
import find from 'lodash/find'

// 纯粹为了给lodash减肥

const m_ = {
  cloneDeep,
  concat,
  curryRight,
  debounce,
  findIndex,
  forEach,
  forIn,
  get,
  isArray,
  isEmpty,
  isNumber,
  isObject,
  isObjectLike,
  isString,
  isUndefined,
  keys,
  last,
  memoize,
  merge,
  mergeWith,
  slice,
  split,
  startsWith,
  toLower,
  trim,
  unset,
  values,
  min,
  find,
}

export default m_

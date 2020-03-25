/* eslint-disable consistent-return */
import mergeWith from 'lodash/mergeWith'
import { isNotEmpty } from '@/nice-router/nice-router-util'

function replaceArray(objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return srcValue
  }
}

function concatArray(objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
}

function mergeState(preState = {}, newState = {}, doMerge = false, arrayMerge = 'append') {
  const { viewHashString: preHash } = preState
  const { viewHashString: newHash } = newState

  // 数据没有变化
  if (isNotEmpty(newHash) && preHash === newHash) {
    return null
  }

  // 不进行merge操作
  if (!doMerge) {
    return newState
  }

  // merge 对象, 不指定array的merge方法，默认为concat data to legacy array
  const processor = arrayMerge === 'replace' ? replaceArray : concatArray
  const result = mergeWith(preState, newState, processor)
  console.log('merged result', result)

  return result
}

const createDefault = (namespace) => ({
  namespace,
  state: {},
  effects: {},
  reducers: {
    clear() {
      return {}
    },
    save(state, { payload }) {
      const { statInPage, arrayMerge, ...resp } = payload
      const result = mergeState(state, resp, statInPage, arrayMerge)
      return result || state
    },
  },
})

const ModelTools = {
  mergeState,
  createDefault,
}
export default ModelTools

import get from 'lodash/get'
import trim from 'lodash/trim'
import isEmpty from 'lodash/isEmpty'
import { log } from './nice-router-util'
import NiceRouter from './nice-router'

const ViewMappingService = {
  getView(backendKey = '') {
    const key = trim(backendKey)
    let result = get(NiceRouter.config.viewConfig, key, {})
    if (isEmpty(result)) {
      const shortKey = key.substr(key.lastIndexOf('.') + 1, key.length)
      log('the key for class', key, 'not found, try to map with shortKey', shortKey)
      result = get(NiceRouter.config.viewConfig, shortKey, {})
    }
    return result
  },
}

export default ViewMappingService

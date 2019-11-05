import get from 'lodash/get'
import trim from 'lodash/trim'
import NiceRouter from './nice-router'

const ViewMappingService = {
  getView(backendKey = '') {
    const result = get(NiceRouter.config.viewConfig, trim(backendKey), {})
    console.log(`find view mapping for class '${backendKey}'`, result)
    return result
  },
}

export default ViewMappingService

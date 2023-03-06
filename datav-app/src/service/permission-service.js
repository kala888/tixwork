import { check, PERMISSIONS, request } from 'react-native-permissions'
import device from '@/nice-router/device'
import _ from 'lodash'

// 'unavailable' | 'denied' | 'blocked' | 'granted'
//  'error'
const PermissionService = {
  check: (type = '') => {
    const OS = device.ios ? 'IOS' : 'ANDROID'
    const target = _.get(PERMISSIONS, `${OS}.${type.toUpperCase()}`)

    console.warn('target', `${OS}.${type.toUpperCase()}`, target)
    // promise

    return check(target)
  },
  checkCameraPermission: async () => {
    try {
      const result = await PermissionService.check('camera')
      // granted and ios，just return the result
      if (result === 'granted' || device.ios) {
        return result
      }
      const androidCamera = await request(PERMISSIONS.ANDROID.CAMERA)
      console.log('androidCamera', androidCamera)
      return androidCamera
    } catch (err) {
      return err
    }
  },
}

export default PermissionService

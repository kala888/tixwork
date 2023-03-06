import { Dimensions, Platform, StatusBar } from 'react-native'
import DeviceInfo from 'react-native-device-info'

const { width, height } = Dimensions.get('window')

const { Version } = Platform
const ios = Platform.OS === 'ios'
const android = Platform.OS === 'android'
const isIPhoneX = ios && height === 812 && width === 375
const iphoneBarHeight = isIPhoneX ? 44 : 20
const statusBarHeight =
  Platform.OS === 'ios' ? iphoneBarHeight : StatusBar.currentHeight
const isBigger = height > 800

const device = {
  ios,
  android,
  isIPhoneX,
  statusBarHeight,
  width,
  height,
  Version,
  deviceID: DeviceInfo.getUniqueId(),
  deviceID2: DeviceInfo.getDeviceId(),
  manufacturer: DeviceInfo.getManufacturer(),
  deviceBrand: DeviceInfo.getBrand(),
  deviceModel: DeviceInfo.getModel(),
  deviceName: DeviceInfo.getDeviceName(),
  systemVersion: DeviceInfo.getSystemVersion(),
  appVersion: DeviceInfo.getVersion(),
  appReadableVersion: DeviceInfo.getReadableVersion(),
  userAgent: DeviceInfo.getUserAgent(),
  tablet: DeviceInfo.isTablet(),
  phoneNumber: DeviceInfo.getPhoneNumber(),
  isBigger,
  pageBottomPadding: isBigger ? 60 : 20,
}

console.log('device', device)

export default device

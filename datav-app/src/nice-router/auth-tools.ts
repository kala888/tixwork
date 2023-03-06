import StorageTools from './storage-tools'
import TouchIdTools from '@/service/touch-id/touch-id-tools'
import _ from 'lodash'
import jwtDecode from 'jwt-decode'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import OfflineService from '@/service/offline/offline-service'

const TOKEN = 'TOKEN'
const AUTH_INFO = 'AUTH_INFO'

const SAFETY_TIME = 1800 //预留半个小时过期（单位秒）


export enum AuthInfoSecurityStatus {
  ANONYMOUS = 'ANONYMOUS',
  CERTIFICATE = 'CERTIFICATE',
}

export type AuthInfoType = {
  envType?: string; //颁发token的环境
  exp: number; //过期时间
  securityStatus: AuthInfoSecurityStatus; // token的安全类型
  userId: string; //当前用户Id
  tags: string[]; //这个token的标签
};

const toAuthInfo = _.memoize(
  (token: string): AuthInfoType => (isNotEmpty(token) ? jwtDecode(token) : ({} as AuthInfoType)),
)

async function saveTokenAsync(token) {
  await StorageTools.set(TOKEN, token)
  console.log('saveToken', token)
  const authInfo: AuthInfoType = toAuthInfo(token)
  await StorageTools.set(AUTH_INFO, authInfo)
  console.log('saveAuthInfo', authInfo)
  return authInfo
}


/**
 * 是否是一个有效的登录token
 */
async function isLoginToken() {
  const authInfo = await getAuthInfoAsync()
  if (authInfo.securityStatus === AuthInfoSecurityStatus.CERTIFICATE && authInfo.exp > 0) {
    console.log('the token expTime is', authInfo.exp, 'will exp ', authInfo.exp - Date.now() / 1000, 'latter')
    return authInfo.exp - Date.now() / 1000 > SAFETY_TIME
  }
  return false
}


async function getAuthInfoAsync() {
  const authInfo = await StorageTools.get(AUTH_INFO, {})
  return authInfo
}

async function getTokenAsync() {
  const token = await StorageTools.get(TOKEN, '')
  return token
}

async function logout() {
  await StorageTools.remove(TOKEN)
  await StorageTools.remove(AUTH_INFO)
  await OfflineService.setLoginInfo({} as any)
  await TouchIdTools.g().logout()
}

const AuthTools = {
  getTokenAsync,
  getAuthInfoAsync,
  saveTokenAsync,
  logout,
  isLoginToken,
  toAuthInfo,
}
export default AuthTools

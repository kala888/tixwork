import jwtDecode from 'jwt-decode'
import { isNotEmpty, log } from './nice-router-util'
import StorageTools from './storage-tools'

const TOKEN = 'TOKEN'
const AUTH_INFO = 'AUTH_INFO'

const SAFETY_TIME = 1800 //预留半个小时过期（单位秒）

async function saveTokenAsync(token) {
  StorageTools.set(TOKEN, token)
  log('saveToken', token)

  if (token) {
    window.Date = Date
    window.setTimeout = setTimeout
    console.log('xxxx date:', window.Date)
    console.log('xxxx setTimeout', window.setTimeout)
    console.log('xxxx token', token)
    const authInfo = jwtDecode(token)
    StorageTools.set(AUTH_INFO, authInfo)
    log('saveAuthInfo', authInfo)
    return authInfo
  }
  return {}
}

async function isValidateToken() {
  const authInfo = await getAuthInfoAsync()
  if (isNotEmpty(authInfo) && authInfo.exp > 0) {
    log('the token expTime is', authInfo.exp, 'will exp ', authInfo.exp - Date.now() / 1000, 'latter')
    return authInfo.exp - Date.now() / 1000 > SAFETY_TIME
  }
  return false
}

async function getAuthInfoAsync() {
  return StorageTools.get(AUTH_INFO, {})
}

async function getTokenAsync() {
  return StorageTools.get(TOKEN, '')
}

async function logout() {
  StorageTools.remove(TOKEN)
  StorageTools.remove(AUTH_INFO)
  // StorageTools.remove(COOKIES)
}

// async function syncToken() {
//   const authInfo = await getAuthInfoAsync()
//   const uri = Config.api.JsCode2Session
//   if (!authInfo.expireIn && uri) {
//     const wxloginResp = await Taro.login()
//     if (wxloginResp.code) {
//       const url = uri.replace(':code', wxloginResp.code)
//       NavigationService.ajax(
//         url,
//         {},
//         {
//           onSuccess: (resp) => {
//             saveTokenAsync(resp.token)
//           },
//         })
//     }
//   }
// }

const AuthTools = {
  getTokenAsync,
  getAuthInfoAsync,
  saveTokenAsync,
  logout,
  // syncToken,
  isValidateToken,
}
export default AuthTools

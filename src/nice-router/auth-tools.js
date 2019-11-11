import jwtDecode from 'jwt-decode'
import isEmpty from 'lodash/isEmpty'
import StorageTools from './storage-tools'

const TOKEN = 'TOKEN'
const AUTH_INFO = 'AUTH_INFO'

const SAFTY_TIME = 1800 //预留半个小时过期（单位秒）

async function saveTokenAsync(token) {
  StorageTools.set(TOKEN, token)
  const authInfo = jwtDecode(token)
  StorageTools.set(AUTH_INFO, authInfo)

  console.log('saveToken', token)
  console.log('saveAuthInfo', authInfo)
  return authInfo
}

async function isValidateToken() {
  const authInfo = await getAuthInfoAsync()
  if (!isEmpty(authInfo) && authInfo.exp > 0) {
    console.log('the token expTime is', authInfo.exp, 'will exp ', authInfo.exp - Date.now() / 1000, 'latter')
    return authInfo.exp - Date.now() / 1000 > SAFTY_TIME
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

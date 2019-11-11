import jwtDecode from 'jwt-decode'
import StorageTools from './storage-tools'

const TOKEN = 'TOKEN'
const AUTH_INFO = 'AUTH_INFO'

async function saveTokenAsync(token) {
  StorageTools.set(TOKEN, token)
  const authInfo = jwtDecode(token)
  StorageTools.set(AUTH_INFO, authInfo)

  console.log('saveToken', token)
  console.log('saveAuthInfo', authInfo)
  return authInfo
}

async function isValidateToken(token) {
  const authInfo = jwtDecode(token)
  console.log('authInfo', authInfo) //TODO need check the exprtime
  return true
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

import AuthTools from '@/nice-router/auth-tools'
import TouchIdTools from '@/service/touch-id/touch-id-tools'

const FACE_LOGIN_OPTION = 'face-id'
const COMMON_LOGIN_OPTION = 'common-login'
const CHECK_PASSED = 'passed'

async function checkLogin() {
  const { isSupport, isEnabled, isInSafetyTime } = TouchIdTools.g()

  const loginInfo = await AuthTools.getLoginInfo()

  // 1，token 无效
  if (!loginInfo.isValid) {
    console.warn('checkLogin：登录失效')
    return COMMON_LOGIN_OPTION
  }

  // 2,如果支持且开启了faceId, 但有效期过期（或是登出状态->登出就直接把时间过期)
  const safety = await isInSafetyTime()
  if (isSupport() && isEnabled() && !safety) {
    console.warn('checkLogin：有效期过期', safety)
    return FACE_LOGIN_OPTION
  }

  console.warn(
    'passed=> support',
    isSupport(),
    'enabled',
    isEnabled(),
    'inSafetyTime',
    safety
  )
  return CHECK_PASSED
}

const logout = async () => {
  const { isSupport, isEnabled, logout: touchIdLogout } = TouchIdTools.g()

  if (!isSupport() || !isEnabled()) {
    await AuthTools.logout()
  }
  await touchIdLogout()
}

const ProtectedChecker = {
  checkLogin,
  logout,
  FACE_LOGIN_OPTION,
  COMMON_LOGIN_OPTION,
  CHECK_PASSED,
}

export default ProtectedChecker

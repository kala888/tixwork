import AuthTools from '../auth-tools'
import { log } from '../nice-router-util'

const AuthTokenProcessor = async (chain) => {
  const token = await AuthTools.getTokenAsync()
  const { requestParams } = chain
  const { headers = {} } = requestParams

  log('set Authorization token to Request Header:', token)
  return chain.proceed({
    ...requestParams,
    headers: {
      ...headers,
      Authorization: token,
    },
  })
}

export default AuthTokenProcessor

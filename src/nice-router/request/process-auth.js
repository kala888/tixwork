import AuthTools from '../auth-tools'
import { log } from '../nice-router-util'

const processAuth = async (chain) => {
  const token = await AuthTools.getTokenAsync()
  const { requestParams } = chain
  const { options: { headers = {} } = {} } = requestParams

  log('set Authorization token to Request Header:', token)
  return chain.proceed({
    ...requestParams,
    headers: {
      ...headers,
      Authorization: token,
    },
  })
}

export default processAuth

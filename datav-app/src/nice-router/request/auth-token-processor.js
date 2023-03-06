import AuthTools from '../auth-tools'
import { isNotEmpty } from '../nice-router-util'

const AuthTokenProcessor = async (ctx, next) => {
  const token = await AuthTools.getTokenAsync()
  console.log('set Authorization token to Request Header:', token)
  console.log('ctx.req.options', ctx?.req?.options)
  const requestOptions = ctx?.req?.options || {}
  const requestHeader = requestOptions?.headers
  ctx.req.options = {
    ...requestOptions,
    credentials: 'omit',
    headers: {
      ...requestHeader,
      Authorization: token
    },
  }
  await next()
  const responseHeader = ctx?.res?.headers || {}
  const theNewToken = responseHeader.authorization
  console.log('resp.....', theNewToken, responseHeader, ctx?.res)
  if (isNotEmpty(theNewToken)) {
    console.log('the token changed, save the token')
    await AuthTools.saveTokenAsync(theNewToken)
  }
}

export default AuthTokenProcessor

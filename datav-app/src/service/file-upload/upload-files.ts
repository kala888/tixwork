import { ApiConfig } from '@/utils/config'
import { formatTime } from '@/utils'
import { OssTokenDTO } from './aliyun-oss-helper'
import GlobalLoading from '@/nice-router/global-loading'
import AliyunOSS from 'aliyun-oss-react-native'
import Config from '@/nice-router/nice-router.config'
import BackendService from '@/nice-router/request/backend-service'
import { isNotEmpty } from '@/nice-router/nice-router-util'

AliyunOSS.enableDevMode()

const configuration = {
  maxRetryCount: 3,
  timeoutIntervalForRequest: 30,
  timeoutIntervalForResource: 24 * 60 * 60,
}


let ossToken: OssTokenDTO

function isValidateToken(): boolean {
  if (isNotEmpty(ossToken) && isNotEmpty(ossToken.expiration)) {
    const expr = new Date(ossToken.expiration)
    // 5分钟提前量
    return (expr.valueOf() - (Date.now()) > 1000 * 300)
  }
  return false
}

function getFileName(filePath = '') {
  const randomFileName = formatTime(Date.now(), 'yyyyMMdd/hhmmss_') + (Math.random() * 1000000 + 100000).toFixed()
  const startPos = filePath.lastIndexOf('.')
  const enPos = filePath.length
  const suffix = filePath.substring(startPos + 1, enPos)
  return `${randomFileName}.${suffix}`
}

const uploadFile = async (image = {} as any): Promise<string> => {
  const { path } = image
  if (!isValidateToken()) {
    const resp = await BackendService.send({ uri: ApiConfig.OSSToken })
    ossToken = resp.data
  }
  const { prefix = '', userHome = '' } = ossToken
  const fileName = getFileName(path)

  const key = `${userHome}/${fileName}`
  GlobalLoading.showLoadingModal('上传凭证中')

  console.log('xxcvcvcv', ossToken)
  // @ts-ignore
  AliyunOSS.initWithServerSTS(Config.baseURL + ApiConfig.OSSToken, ossToken.endpoint, configuration)

  console.log('ossToken.bucket, key, path', ossToken.bucket, key, path)
  const resp = await AliyunOSS.asyncUpload(ossToken.bucket, key, path)

  const remoteUrl = prefix + '/' + key
  GlobalLoading.hideLoadingModal()
  console.log('upload file result', resp, remoteUrl)
  return remoteUrl
}


export default uploadFile

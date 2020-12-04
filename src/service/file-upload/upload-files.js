import NavigationService from '@/nice-router/navigation-service'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import Config from '@/utils/config'
import { formatTime } from '@/utils/index'
import Taro from '@tarojs/taro'
import getAliyunConfig from './aliyun-oss-helper'

let ossToken = {
  // type: 'qiniu',
  // expiration: '2019-11-06T10:21:18Z',
  // userHome: 'upload/doublechain/11',
  // prefix: 'xxx',
  // uploadPrefix: 'https://doublechain-public.oss-cn-beijing.aliyuncs.com',
}

function isValidateToken() {
  if (isNotEmpty(ossToken) && isNotEmpty(ossToken.expiration)) {
    const expr = new Date(ossToken.expiration)
    // 5分钟提前量
    return expr < Date.now() - 1000 * 300
  }
  return false
}

function getFileName(filePath = '') {
  const startPos = filePath.lastIndexOf('.')
  const enPos = filePath.length
  const suffix = filePath.substring(startPos + 1, enPos)
  const randomFileName = formatTime(Date.now(), 'yyyyMMddhhmmss_') + (Math.random() * 1000000 + 100000).toFixed()
  return `${randomFileName}.${suffix}`
}

function uploadFiles(params = {}) {
  const { todoList = [] } = params

  if (todoList.length === 0) {
    console.warn('nothing to upload!')
    return
  }

  if (isValidateToken()) {
    console.log('validatae...token')
    uploadFiles2OSS(params)
  } else {
    console.log('need-new token')
    NavigationService.ajax(
      Config.api.OSSToken,
      {},
      {
        onSuccess: (resp) => {
          console.log('need-new resp', resp)
          ossToken = resp
          uploadFiles2OSS(params)
        },
      }
    )
  }
}

function uploadFiles2OSS(params = {}) {
  //
  // if (isEmpty(ossToken)) {
  //   Taro.showToast({
  //     title: `获取token失败，稍后再试`,
  //     icon: 'none',
  //     duration: 2 * 1000,
  //   })
  //   return
  // }

  const { todoList, onProgress, onStart, onComplete, onSuccess, onFail } = params
  const { type = 'qiniu', uploadPrefix = '', prefix = '', userHome = '' } = ossToken

  let formParam = { token: ossToken.securityToken }
  if (type === 'aliyun') {
    formParam = getAliyunConfig(ossToken)
  }

  todoList.map(async (it) => {
    if (onStart) {
      onStart(it)
    }

    const { url: sourceFile = '' } = it
    const fileName = getFileName(sourceFile)
    const key = `${userHome}/${fileName}`
    await Taro.showLoading({ title: '上传凭证中' })

    const uploadTask = Taro.uploadFile({
      url: uploadPrefix || prefix,
      filePath: sourceFile,
      name: 'file',
      formData: {
        key,
        ...formParam,
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      success: (resp) => {
        console.log('upload file result', resp)
        const remoteFile = prefix + '/' + key
        const result = {
          sourceFile,
          remoteFile,
        }
        if (onSuccess) {
          onSuccess(result)
        }
      },
      fail: (err) => {
        Taro.showToast({
          title: `上传失败: ${JSON.stringify(err)}`,
          icon: 'none',
          duration: 2 * 1000,
        })
        if (onFail) {
          onFail(err)
        }
      },
      complete: (res) => {
        console.log('complete', res)
        Taro.hideLoading()
        if (onComplete) {
          onComplete()
        }
      },
    })
    if (onProgress) {
      uploadTask.progress(onProgress)
    }
  })
}

export default uploadFiles

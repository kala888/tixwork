import Taro from '@tarojs/taro'
import isEmpty from 'lodash/isEmpty'
import random from 'lodash/random'
import NavigationService from '@/nice-router/navigation.service'
import { formatTime } from '@/utils/index'

let ossToken = {}

function isValidateToken() {
  return !(isEmpty(ossToken) || ossToken.exprTime < Date.now() - 1000 * 300)
}

function getFileName(filePath = '') {
  const startPos = filePath.lastIndexOf('.')
  const enPos = filePath.length
  const suffix = filePath.substring(startPos + 1, enPos)
  const randomFileName = formatTime(Date.now(), 'yyyyMMddhhmmss_') + random(1000000, 9999999)
  return `${randomFileName}.${suffix}`
}

function uploadFiles(params = {}) {
  const { todoList = [] } = params

  if (todoList.length === 0) {
    console.warn('nothing to upload!')
    return
  }

  if (isValidateToken()) {
    uploadFiles2OSS(params)
  } else {
    NavigationService.ajax('testOss/', {}, {
      onSuccess: (resp) => {
        ossToken = resp
        uploadFiles2OSS(params)
      },
    })
  }
}


function uploadFiles2OSS(params = {}) {
  const { todoList, onProgress, onStart, onComplete, onSuccess, onFail } = params
  const { token = '', uploadPrefix = '', downloadPrefix = '', home = '' } = ossToken

  todoList.map(async (it) => {
    if (onStart) {
      onStart(it)
    }

    const { url: sourceFile = '' } = it
    const fileName = getFileName(sourceFile)
    const key = `${home}/${fileName}`
    Taro.showLoading({ title: '上传凭证中' })

    const uploadTask = Taro.uploadFile({
      url: uploadPrefix,
      filePath: sourceFile,
      name: 'file',
      formData: {
        key,
        token,
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      success: (res) => {
        const dataString = res.data
        const dataObject = JSON.parse(dataString)
        const remoteFile = downloadPrefix + '/' + dataObject.key
        const result = {
          sourceFile,
          resp: dataObject,
          remoteFile,
        }
        if (onSuccess) {
          onSuccess(result)
        }
      },
      fail: (err) => {
        Taro.showToast({
          title: `上传失败: ${err}`,
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

import codePush from 'react-native-code-push'
import GlobalLoading from '@/nice-router/global-loading'
import {DOWNLOAD_EVENT} from './download-processor'
import {DeviceEventEmitter} from 'react-native'
import _ from 'lodash'
import GlobalToast from '@/nice-router/global-toast'

export const updateCheck = async (showChecking = false) => {
  console.log('Triggered code push when app is active')
  if (showChecking) {
    GlobalToast.show({text: '版本检测中。。。'})
  }
  const update = await codePush.checkForUpdate()
  const info = await codePush.getUpdateMetadata()
  console.log('update meta info', info)
  console.log('update meta update', update)
  if (!update) {
    if (showChecking) {
      GlobalToast.show({text: '版本已经是最新的了'})
    }
    return false
  }

  const handleUpdate = async () => {
    GlobalLoading.showLoadingModal('软件更新中，完成后会自动重启。')
    DeviceEventEmitter.emit(DOWNLOAD_EVENT, '开始下载，请稍等。')

    const syncStatusChangeCallback = (status) => {
      console.log('the sync status changed', status)
    }
    const downloadProgressCallback = (progress) => {
      const total = (progress.totalBytes / 1024).toFixed(0)
      const received = (progress.receivedBytes / 1024).toFixed(0)
      const percent = _.toNumber((progress.receivedBytes * 100 / progress.totalBytes).toFixed(0))
      const tips = `已下载 ${received} K, 共计 ${total} K，已完成 ${percent}%`
      console.log(tips)
      DeviceEventEmitter.emit(DOWNLOAD_EVENT, tips)
    }
    const status = await codePush.sync(
      {installMode: codePush.InstallMode.IMMEDIATE},
      syncStatusChangeCallback,
      downloadProgressCallback,
    )
    console.log('update status', status)
    await codePush.notifyAppReady()
    codePush.restartApp()
  }

  //强制更新
  handleUpdate().then()
  //
  // const updateAction = {
  //   text: '立即更新', onPress: handleUpdate,
  // }
  // const cancelAction = {
  //   text: '取消',
  //   onPress: () => console.log('cancel'),
  //   style: 'cancel',
  // }
  //
  // const actionList = update?.isMandatory ? [updateAction] : [cancelAction, updateAction]
  // console.log('Mandatory update?', update?.isMandatory)
  // const desc = _.get(update, 'description', '新的内容需要更新')
  // const content = <DownloadProcessor title={desc} />
  // Modal.alert('更新提示', content, actionList)
  return true
}

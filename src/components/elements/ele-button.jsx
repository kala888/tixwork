import React from 'react'
import _ from 'lodash'
import NavigationService from '@/nice-router/navigation-service'
import { getExtMode, isNotEmpty } from '@/nice-router/nice-router-util'
import Taro from '@tarojs/taro'

import ActionIcon from '@/components/action-icon/action-icon'
import { Button, View } from '@tarojs/components'

import './ele-button.scss'

// form中组件封装后，button 不会触发form的handle方法问题
// https://github.com/NervJS/taro-ui/issues/96

function EleButton(props) {
  const {
    id,
    linkToUrl,
    extraData,
    title,
    size,
    type,
    icon,
    imageUrl,
    mode,
    ajax = false,
    disabled,
    reLaunch,
    openType,
    onClick,
    className,
    children,
    ...others
  } = props

  let wxOpenType = openType
  if (!openType && (type === 'share' || type === 'getPhoneNumber' || type === 'getUserInfo')) {
    wxOpenType = type
  }

  const formType = type === 'submit' || type === 'reset' ? type : null

  const handleMakeCall = () => {
    const { phoneNumber } = extraData
    if (phoneNumber) {
      // noinspection JSIgnoredPromiseFromCall
      Taro.makePhoneCall({ phoneNumber })
    }
  }

  const handleScan = async () => {
    const res = await Taro.scanCode()
    const arg = encodeURIComponent(res.result)
    const actionPath = `${linkToUrl}${arg}/`
    console.log('I want to access ', actionPath)
    await NavigationService.view(props)
  }

  const handlePreview = async () => {
    console.log('preview document', linkToUrl)
    if (!linkToUrl) {
      return
    }
    try {
      await Taro.showLoading({ title: '正在打开文件...', mask: true })
      const res = await Taro.downloadFile({ url: linkToUrl })
      await Taro.openDocument({ filePath: res.tempFilePath })
    } catch (e) {
      await Taro.showToast({ title: '文件打开失败，稍后重试', icon: 'none' })
    } finally {
      Taro.hideLoading()
    }
  }

  const handleDownload = async () => {
    if (!linkToUrl) {
      return
    }
    try {
      await Taro.showLoading({ title: '正在下载文件...', mask: true })
      await Taro.downloadFile({ url: linkToUrl })
    } catch (e) {
      await Taro.showToast({ title: '下载文件失败，稍后重试', icon: 'none' })
    } finally {
      Taro.hideLoading()
    }
  }

  const handleCopy = () => {
    if (isNotEmpty(extraData)) {
      // noinspection JSIgnoredPromiseFromCall
      Taro.setClipboardData({
        data: JSON.stringify(extraData),
        success: () =>
          Taro.showToast({ title: '已经复制到内存, 请分享或在浏览器中打开', icon: 'none', duration: 5000 }),
      })
    }
  }

  const handleClick = _.debounce(async () => {
    if (onClick) {
      onClick()
      return
    }

    if (type === 'submit' || type === 'share' || type === 'getUserInfo') {
      return
    }

    if (type === 'makeCall') {
      handleMakeCall()
      return
    }

    if (type === 'open-document') {
      await handlePreview()
      return
    }
    if (type === 'download') {
      await handleDownload()
      return
    }
    if (type === 'copy') {
      handleCopy()
      return
    }
    if (type === 'scanner') {
      await handleScan()
      return
    }

    console.log('type is', type, 'just do view action', props)

    await NavigationService.view(
      props,
      {},
      {
        navigationOptions: reLaunch ? { method: 'reLaunch' } : null,
        statInPage: ajax,
      }
    )
  }, 200)

  const rootClass = getExtMode(mode, { disabled }).classNames('ele-button', className)

  const buttonSize = size === 'small' ? 'mini' : size

  console.log('othersothersothersothers', others)
  return (
    <Button
      className={rootClass}
      openType={wxOpenType}
      formType={formType}
      size={buttonSize}
      onClick={handleClick}
      data-extraData={extraData}
      disabled={disabled}
      {...others}
    >
      {children || (
        <View className='ele-button-body'>
          <ActionIcon icon={icon} imageUrl={imageUrl} />
          <View className='ele-button-text'>{title}</View>
        </View>
      )}
    </Button>
  )
}

EleButton.defaultProps = {
  title: '',
  type: '',
  size: null,
  className: null,
  extraData: {},
  icon: null,
  imageUrl: null,
}

export default EleButton

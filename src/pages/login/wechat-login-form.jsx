import React from 'react'

import { AtButton } from 'taro-ui'
import NavigationService from '@/nice-router/navigation.service'

import './login.scss'

export default function WechatLoginForm() {
  const handleSubmit = () => {
    // eslint-disable-next-line no-undef
    let loginMethod = wx.qy ? 'wechat_work_app' : 'wechat_app'
    NavigationService.dispatch('app/login', {
      loginMethod: loginMethod,
    })
  }
  return (
    <AtButton className='login-button' onClick={handleSubmit}>
      微信登录
    </AtButton>
  )
}

import React from 'react'
import ServerImage from '@/server-image/server-image'
import Config from '@/utils/config'
import { Text, View } from '@tarojs/components'
import loginLogo from '../../assets/login-logo.png'

import './login.scss'
import VCodeLoginForm from './vcode-login-from'
import PasswordLoginForm from './password-login-from'
import WechatLoginForm from './wechat-login-form'

export default function LoginPage() {
  return (
    <View className='login-page'>
      <View className='login-page-header'>
        <View className='login-page-header-txt'>
          <Text>{Config.name}</Text>
        </View>
        <ServerImage className='login-page-header-logo' src={loginLogo} />
      </View>

      <View className='login-page-body'>
        <View className='login-form-brief'>WELCOME TO LOGIN</View>
        <View className='form-form-title'>欢迎登录</View>

        {Config.loginMode === 'wechat' && <WechatLoginForm />}
        {Config.loginMode === 'vcode' && <VCodeLoginForm />}
        {Config.loginMode === 'password' && <PasswordLoginForm />}
      </View>
    </View>
  )
}

import EleInput from '@/components/form/field/ele-input'
import { Block, View } from '@tarojs/components'
import React, { useState } from 'react'

import { AtButton } from 'taro-ui'
import NavigationService from '@/nice-router/navigation-service'

import './login.scss'

export default function PasswordForm() {
  const [login, setLogin] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = () => {
    NavigationService.dispatch('app/login', {
      loginMethod: 'account_password',
      login,
      password,
    })
  }

  return (
    <Block>
      <View className='login-form-fields'>
        <EleInput
          className='login-form-fields-input'
          placeholder='请输入用户名'
          name='login'
          value={login}
          onChange={setLogin}
        />
        <EleInput
          className='login-form-fields-input'
          placeholder='请输入密码'
          name='password'
          type='password'
          value={password}
          onChange={setPassword}
        />
      </View>
      <AtButton className='login-button' onClick={handleSubmit}>
        登录
      </AtButton>
    </Block>
  )
}

import React from 'react'
import _ from 'lodash'
import EleButton from '@/components/elements/ele-button'
import EleInput from '@/components/form/field/ele-input'
import MobileVerifyCode from '@/components/mobile-verify-code'
import FormUtil from '@/components/form/form-util'
import NavigationService from '@/nice-router/navigation.service'
import ServerImage from '@/server-image/server-image'
import { useAsyncState } from '@/service/use.service'
import Config from '@/utils/config'
import { Block, Text, View } from '@tarojs/components'
import loginLogo from '../../assets/login-logo.png'

import './login.scss'

export default function LoginPage() {
  const [fieldValues, setFieldValues] = useAsyncState({})

  const handleChange = _.curryRight((value, event, name) => {
    console.log('item event maybe you needed', event)
    const fieldValue = FormUtil.getValue(value)
    setFieldValues((preState) => ({
      ...preState,
      [name]: fieldValue,
    }))
  })

  const handleMobileChange = handleChange('mobile')
  const handleVerifyCodeChange = handleChange('verifyCode')
  const handleLoginChange = handleChange('login')
  const handlePasswordChange = handleChange('password')
  const handleSubmit = () => {
    NavigationService.dispatch('app/login', fieldValues)
  }

  return (
    <View className='login-page'>
      <View className='login-page-header'>
        <View className='login-page-header-txt'>
          <Text>{Config.name}</Text>
        </View>
        <ServerImage className='login-page-header-logo' src={loginLogo} />
      </View>

      <View className='login-page-body'>
        <View className='login-form'>
          <View className='login-form-brief'>WELCOME TO LOGIN</View>
          <View className='login-form-title'>欢迎登录</View>
          <View className='login-form-fields'>
            {Config.loginMethod === 'vcode' && (
              <Block>
                <MobileVerifyCode
                  className='login-form-fields-txt-input'
                  placeholder='请输入手机号'
                  type='phone'
                  name='mobile'
                  value={fieldValues.mobile}
                  onChange={handleMobileChange}
                />
                <EleInput
                  className='login-form-fields-txt-input,login-form-fields-vcode-value'
                  placeholder='请输入验证码'
                  type='number'
                  name='verifyCode'
                  value={fieldValues.verifyCode}
                  onChange={handleVerifyCodeChange}
                />
              </Block>
            )}

            {Config.loginMethod === 'password' && (
              <Block>
                <EleInput
                  className='login-form-fields-txt-input'
                  placeholder='请输入用户名'
                  name='login'
                  value={fieldValues.login}
                  onChange={handleLoginChange}
                />
                <EleInput
                  className='login-form-fields-txt-input'
                  placeholder='请输入密码'
                  name='password'
                  type='password'
                  value={fieldValues.password}
                  onChange={handlePasswordChange}
                />
              </Block>
            )}
          </View>
        </View>
        <View>
          <EleButton
            btnType='submit'
            title='登录'
            className='login-submit-button'
            full={false}
            onClick={handleSubmit}
          />
        </View>
      </View>
    </View>
  )
}

import MobileVerifyCode from '@/components/mobile-verify-code'
import EleInput from '@/components/form/field/ele-input'
import { Block, View } from '@tarojs/components'
import React, { useEffect, useState } from 'react'
import { AtButton } from 'taro-ui'
import NavigationService from '@/nice-router/navigation.service'

import { isNotEmpty } from '@/nice-router/nice-router-util'
import { useVisible } from '@/service/use.service'
import Taro from '@tarojs/taro'
import './login.scss'

export default function VCodeLoginForm() {
  const [mobile, setMobile] = useState()
  const [loginCode, setLoginCode] = useState('')
  const [code, setCode] = useState()

  const { visible, toggle } = useVisible(true)

  useEffect(() => {
    Taro.login({
      success: (res) => setLoginCode(res.code),
    })
  }, [])

  const handleSubmit = () => {
    NavigationService.dispatch('app/login', {
      loginMethod: 'mobile_vcode',
      mobile,
      verifyCode: code,
    })
  }

  const handleBindingWechatMobile = (e) => {
    const { encryptedData } = e.detail
    if (isNotEmpty(encryptedData)) {
      NavigationService.dispatch('app/login', {
        ...e.detail,
        loginMethod: 'wechat_mobile',
        code: loginCode,
      })
    }
  }

  if (visible) {
    return (
      <Block>
        <AtButton openType='getPhoneNumber' className='login-button' onGetPhoneNumber={handleBindingWechatMobile}>
          使用微信绑定的手机号
        </AtButton>
        <View className='login-form-fields-switch'>
          <AtButton full={false} onClick={toggle}>
            其他手机号码
          </AtButton>
        </View>
      </Block>
    )
  }

  return (
    <Block>
      <View className='login-form-fields'>
        <MobileVerifyCode
          name='mobile'
          className='login-form-fields-input'
          placeholder='请输入手机号'
          value={mobile}
          onChange={setMobile}
        />
        <EleInput
          name='vcode'
          className='login-form-fields-input,login-form-fields-vcode'
          placeholder='请输入验证码'
          type='number'
          value={code}
          onChange={setCode}
        />
      </View>
      <View className='login-form-fields-switch'>
        <AtButton full={false} onClick={toggle}>
          使用微信绑定手机号
        </AtButton>
      </View>

      <AtButton className='login-button' onClick={handleSubmit}>
        登录
      </AtButton>
    </Block>
  )
}

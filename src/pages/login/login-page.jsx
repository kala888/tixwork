import { Block, View } from '@tarojs/components'
import EleButton from '@/components/elements/ele-button'
import EleInput from '@/components/form/field/ele-input'
import EleVcode from '@/components/form/field/ele-vcode'
import NavigationService from '@/nice-router/navigation.service'
import Config from '@/utils/config'
import ServerImage from '@/server-image/server-image'
import FormUtil from '@/components/form/form-util'
import { useAsyncState } from '@/service/use.service'

import './login.scss'
import loginLogo from '../../assets/login-logo.png'

export default function LoginPage() {
  const [fieldValues, setFieldValues] = useAsyncState({})

  const handleChange = (name, value, event) => {
    console.log('item event maybe you needed', event)
    const fieldValue = FormUtil.getValue(value)
    setFieldValues((preState) => ({
      ...preState,
      [name]: fieldValue,
    }))
  }

  const handleSubmit = () => {
    NavigationService.dispatch('app/login', fieldValues)
  }

  return (
    <View className='login-page'>
      <View className='login-page-header'>
        <View className='login-page-header-txt'>
          <View>{Config.name}</View>
        </View>
        <View className='login-page-header-logo'>
          <View className='login-page-header-logo-image'>
            <ServerImage src={loginLogo} />
          </View>
        </View>
      </View>

      <View className='login-page-body'>
        <View className='login-form'>
          <View className='login-form-brief'>WELCOME TO LOGIN</View>
          <View className='login-form-title'>欢迎登录</View>
          <View className='login-form-fields'>
            {Config.loginMethod === 'vcode' && (
              <Block>
                <EleVcode
                  className='login-form-fields-txt-input'
                  placeholder='请输入手机号'
                  name='mobile'
                  type='phone'
                  onChange={handleChange.bind(this, 'mobile')}
                />
                <EleInput
                  className='login-form-fields-txt-input,login-form-fields-vcode-value'
                  placeholder='请输入验证码'
                  type='number'
                  name='verifyCode'
                  onChange={handleChange.bind(this, 'verifyCode')}
                />
              </Block>
            )}

            {Config.loginMethod === 'password' && (
              <Block>
                <EleInput
                  className='login-form-fields-txt-input'
                  placeholder='请输入用户名'
                  name='login'
                  onChange={handleChange.bind(this, 'login')}
                />
                <EleInput
                  className='login-form-fields-txt-input'
                  placeholder='请输入密码'
                  name='password'
                  type='password'
                  onChange={handleChange.bind(this, 'password')}
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

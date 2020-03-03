import Taro from '@tarojs/taro'
import { Block, Form, View } from '@tarojs/components'
import EleButton from '@/genericpage/elements/ele-button'
import EleInput from '@/genericpage/form/ele-input'
import EleVcode from '@/genericpage/form/ele-vcode'
import NavigationService from '@/nice-router/navigation.service'
import Config from '@/utils/config'
import ServerImage from '@/components/image/server-image'

import './login.scss'
import loginLogo from '../../assets/login-logo.png'

const KEY = 'login-form'

export default class LoginPage extends Taro.PureComponent {
  submit = async (formData) => {
    NavigationService.dispatch('app/login', formData)
  }

  handleClick = (e) => {
    const { value } = e.detail
    const payload = {
      formKey: KEY,
      values: value,
      submit: this.submit,
    }
    console.log('form submit from ele-flex', payload, this.props)
    Taro.eventCenter.trigger('form-submit', payload)
  }

  render() {
    return (
      <Form onSubmit={this.handleClick}>
        <View className='login-page'>
          <View className='login-page-header'>
            <View className='login-page-header-txt'>
              <View>DoubleChain</View>
              <View>Tech</View>
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
              {Config.useVcode && (
                <Block>
                  <EleVcode
                    className='login-form-txt-input'
                    placeholder='请输入手机号'
                    name='mobile'
                    formKey={KEY}
                    defaultValue={13308188512}
                  />
                  <EleInput
                    className='login-form-vcode-value'
                    placeholder='请输入验证码'
                    maxLength={6}
                    name='verifyCode'
                    formKey={KEY}
                  />
                </Block>
              )}

              {Config.usePassword && (
                <Block>
                  <EleInput className='login-form-txt-input' placeholder='请输入用户名' name='login' formKey={KEY} />
                  <EleInput className='login-form-txt-input' placeholder='请输入密码' name='password' formKey={KEY} />
                </Block>
              )}
            </View>
            <View>
              <EleButton btnType='submit' title='登录' className='login-submit-button' full={false} />
            </View>
          </View>
        </View>
      </Form>
    )
  }
}

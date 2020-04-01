import Taro from '@tarojs/taro'
import { Block, View } from '@tarojs/components'
import EleButton from '@/genericpage/elements/ele-button'
import EleInput from '@/genericform/field/ele-input'
import EleVcode from '@/genericform/field/ele-vcode'
import NavigationService from '@/nice-router/navigation.service'
import Config from '@/utils/config'
import ServerImage from '@/server-image/server-image'
import FormUtil from '@/genericform/form-util'

import './login.scss'
import loginLogo from '../../assets/login-logo.png'

export default class LoginPage extends Taro.PureComponent {
  state = {
    fieldValues: {},
  }

  handleChange = (name, value, event) => {
    console.log('item event maybe you needed', event)
    const fieldValue = FormUtil.getValue(value)
    this.setState((preState) => ({
      fieldValues: {
        ...preState.fieldValues,
        [name]: fieldValue,
      },
    }))
  }

  handleSubmit = () => {
    NavigationService.dispatch('app/login', this.state.fieldValues)
  }

  render() {
    return (
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
            <View className='login-form-fields'>
              {Config.loginMethod === 'vcode' && (
                <Block>
                  <EleVcode
                    className='login-form-fields-txt-input'
                    placeholder='请输入手机号'
                    name='mobile'
                    type='phone'
                    onChange={this.handleChange.bind(this, 'mobile')}
                  />
                  <EleInput
                    className='login-form-fields-txt-input,login-form-fields-vcode-value'
                    placeholder='请输入验证码'
                    type='number'
                    name='verifyCode'
                    onChange={this.handleChange.bind(this, 'verifyCode')}
                  />
                </Block>
              )}

              {Config.loginMethod === 'password' && (
                <Block>
                  <EleInput
                    className='login-form-fields-txt-input'
                    placeholder='请输入用户名'
                    name='login'
                    onChange={this.handleChange.bind(this, 'login')}
                  />
                  <EleInput
                    className='login-form-fields-txt-input'
                    placeholder='请输入密码'
                    name='password'
                    type='password'
                    onChange={this.handleChange.bind(this, 'password')}
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
              onClick={this.handleSubmit}
            />
          </View>
        </View>
      </View>
    )
  }
}

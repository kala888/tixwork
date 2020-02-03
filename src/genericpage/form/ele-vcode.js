import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput } from 'taro-ui'
import NavigationService from '@/nice-router/navigation.service'
import Config from '@/utils/config'

import './ele-form.scss'

import EleHelper from '../ele-helper'

const MAX_COUNT = 5

export default class EleVcode extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  static defaultProps = {
    name: '',
    placeholder: '请输入手机号码',
  }

  state = {
    disabled: false,
    second: MAX_COUNT,
    mobile: null,
  }

  componentWillUnmount() {
    this.stop()
  }

  sendCode = () => {
    if (this.state.disabled) {
      return
    }

    const { mobile } = this.state

    if (!/^1\d{10}$/.test(mobile)) {
      Taro.showToast({ title: '请输入正确的手机号' })
      return
    }

    this.setState(
      {
        disabled: true,
      },
      () => {
        NavigationService.ajax(Config.api.VerifyCode, { mobile })

        // 倒计时
        this.interval = setInterval(() => {
          if (this.state.second > 0) {
            this.setState({
              second: this.state.second - 1,
            })
            return
          }

          this.setState(
            {
              second: MAX_COUNT,
              disabled: false,
            },
            () => this.stop()
          )
        }, 1000)
      }
    )
  }

  stop = () => {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  handleChange = (value) => {
    const { name, formKey } = this.props
    this.setState(
      {
        mobile: value,
      },
      () => {
        Taro.eventCenter.trigger('form-value-changed', {
          name,
          value,
          formKey,
        })
      }
    )
  }

  render() {
    const { name, placeholder, className } = this.props
    const { disabled, second, mobile } = this.state
    const tips = disabled ? `${second}秒...` : '获取验证码'

    const rootClass = EleHelper.classNames('ele-vcode', className)

    const txtClass = EleHelper.classNames('ele-vcode-txt', {
      'ele-vcode-txt-disabled': disabled,
    })
    return (
      <AtInput
        name={name}
        border={false}
        type='phone'
        placeholder={placeholder}
        value={mobile}
        onChange={this.handleChange}
        className={rootClass}
      >
        <View className={txtClass} onClick={this.sendCode}>
          {tips}
        </View>
      </AtInput>
    )
  }
}

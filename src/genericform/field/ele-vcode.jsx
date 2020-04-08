import Taro, { useEffect, useRef, useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput } from 'taro-ui'
import classNames from 'classnames'
import { noop } from '@/nice-router/nice-router-util'
import NavigationService from '@/nice-router/navigation.service'
import Config from '@/utils/config'

import './styles.scss'

function EleVcode(props) {
  const { maxCount } = props
  const [disabled, setDisabled] = useState(false)
  const [second, setSecond] = useState(maxCount)
  const [mobile, setMobile] = useState(null)

  const interval = useRef()

  useEffect(() => {
    if (disabled) {
      interval.current = setInterval(() => {
        setSecond((t) => {
          console.log('.....', t)
          if (t === 0) {
            setDisabled(false)
            clearInterval(interval.current)
            return maxCount
          }
          return t - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval.current) // clean-up 函数，当前组件被注销时调用
  }, [disabled])

  const { onChange, name, value, placeholder, className } = props
  const sendCode = () => {
    if (disabled) {
      return
    }
    if (!/^1\d{10}$/.test(mobile)) {
      Taro.showToast({ title: '请输入正确的手机号' })
      return
    }
    setDisabled(true)
    NavigationService.ajax(Config.api.VerifyCode, { mobile })
  }

  const handleChange = (v) => {
    setMobile(v)
    onChange(v)
  }

  const tips = disabled ? `${second}秒...` : '获取验证码'

  const rootClass = classNames('ele-vcode', className)
  const txtClass = classNames('ele-vcode-txt', { 'ele-vcode-txt-disabled': disabled })
  return (
    <AtInput
      name={name}
      border={false}
      type='phone'
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className={rootClass}
    >
      <View className={txtClass} onClick={sendCode}>
        {tips}
      </View>
    </AtInput>
  )
}

EleVcode.options = {
  addGlobalClass: true,
}

EleVcode.defaultProps = {
  name: '',
  placeholder: '请输入手机号码',
  onChange: noop,
  maxCount: 60,
}
export default EleVcode

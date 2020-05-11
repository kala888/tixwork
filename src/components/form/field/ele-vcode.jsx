import NavigationService from '@/nice-router/navigation.service'
import { noop } from '@/nice-router/nice-router-util'
import { useCountdown } from '@/service/use.service'
import Config from '@/utils/config'
import { View } from '@tarojs/components'
import Taro, { useState } from '@tarojs/taro'
import classNames from 'classnames'
import { AtInput } from 'taro-ui'

import './styles.scss'

function EleVcode(props) {
  const [mobile, setMobile] = useState(null)

  const { second, counting, startCount } = useCountdown(props.maxCount)

  const { onChange, name, value, placeholder, className } = props

  const sendCode = async () => {
    if (counting) {
      return
    }
    if (!/^1\d{10}$/.test(mobile)) {
      await Taro.showToast({ title: '请输入正确的手机号' })
      return
    }
    startCount()
    NavigationService.ajax(Config.api.VerifyCode, { mobile })
  }

  const handleChange = (v) => {
    setMobile(v)
    onChange(v)
  }

  const tips = counting ? `${second}秒...` : '获取验证码'
  const rootClass = classNames('ele-vcode', className)
  const txtClass = classNames('ele-vcode-txt', { 'ele-vcode-txt-disabled': counting })
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

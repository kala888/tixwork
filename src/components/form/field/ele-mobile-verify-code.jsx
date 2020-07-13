import React from 'react'
import NavigationService from '@/nice-router/navigation.service'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import { useCountdown } from '@/service/use.service'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { AtInput } from 'taro-ui'
import './styles.scss'

function EleMobileVerifyCode(props) {
  const { second, counting, startCount } = useCountdown(props.maxCount)

  const { className, linkToUrl, ...others } = props

  const sendCode = async () => {
    if (isNotEmpty(linkToUrl)) {
      startCount()
      NavigationService.ajax(linkToUrl)
    }
  }

  const tips = counting ? `${second}秒...` : '获取验证码'
  const rootClass = classNames('ele-vcode', className)
  const txtClass = classNames('ele-vcode-txt', { 'ele-vcode-txt-disabled': counting })
  return (
    <AtInput type='text' maxLength={6} {...others} className={rootClass}>
      <View className={txtClass} onClick={sendCode}>
        {tips}
      </View>
    </AtInput>
  )
}

EleMobileVerifyCode.defaultProps = {
  name: '',
  placeholder: '请输入验证码',
  maxCount: 60,
}
export default EleMobileVerifyCode

import React from 'react'
import { getExtMode, isNotEmpty } from '@/nice-router/nice-router-util'
import { useVisible } from '@/service/use-service'
import { Text, View } from '@tarojs/components'
import { AtActionSheet } from 'taro-ui'
import './form-item-label.scss'

function FormItemLabel(props) {
  const { visible, show, close } = useVisible(false)
  const { required, tips, layout, tail } = props

  const hasTips = isNotEmpty(tips)

  const rootClass = getExtMode({ [layout]: true }).classNames('form-item-label', {
    clickable: hasTips,
  })

  const handleShowTips = () => {
    if (hasTips) {
      show()
    }
  }

  return (
    <View className={rootClass} onClick={handleShowTips}>
      <Text className='form-item-label-title'>
        {required && <Text className='form-item-label-required'>*</Text>}
        {props.children}
      </Text>
      {isNotEmpty(tips) && <Text className='iconfont iconfont-question-circle' />}
      {tail}
      <AtActionSheet onClose={close} isOpened={visible}>
        <View className='form-item-label-tips'>
          <View className='form-item-label-tips-title'>{tips?.title || ''}</View>
          <View className='form-item-label-tips-brief'>{tips?.content || tips}</View>
        </View>
      </AtActionSheet>
    </View>
  )
}

FormItemLabel.defaultProps = {
  required: true,
}

export default FormItemLabel

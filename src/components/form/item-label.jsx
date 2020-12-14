import React from 'react'
import { getExtMode, isNotEmpty } from '@/nice-router/nice-router-util'
import { useVisible } from '@/service/use-service'
import { Text, View } from '@tarojs/components'
import _ from 'lodash'
import { AtActionSheet } from 'taro-ui'
import './styles.scss'

function ItemLabel(props) {
  const { visible, show, close } = useVisible(false)
  const { required, tips, layout } = props
  const rootClass = getExtMode({ [layout]: true }).classNames('item-label')

  const tipsTitle = _.isObject(tips) ? tips.title : ''
  const tipsContent = _.isObject(tips) ? tips.content : tips

  const handleShowTips = () => {
    if (isNotEmpty(tips)) {
      show()
    }
  }

  return (
    <View>
      <View className={rootClass}>
        <View onClick={handleShowTips}>
          <Text className='item-label-title'>
            {required && <Text className='item-label-title-required'>*</Text>}
            {props.children}
          </Text>
          {isNotEmpty(tips) && <Text className='iconfont iconfont-question-circle item-label-tips-icon' />}
        </View>

        <AtActionSheet onClose={close} isOpened={visible}>
          <View className='item-label-tips-view'>
            <View className='item-label-tips-view-title'>{tipsTitle}</View>
            <View className='item-label-tips-view-content'>{tipsContent}</View>
          </View>
        </AtActionSheet>
      </View>
    </View>
  )
}

ItemLabel.defaultProps = {
  required: true,
}

export default ItemLabel

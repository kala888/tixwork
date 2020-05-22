import React from 'react'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import { useVisible } from '@/service/use.service'
import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import _ from 'lodash'
import { AtActionSheet } from 'taro-ui'
import './styles.scss'

function ItemLabel(props) {
  const { visible, show, close } = useVisible(false)
  const { required, tips, layout } = props
  const rootClass = classNames('item-label', { [`item-label-${layout}`]: true })

  const tipsTitle = _.isObject(tips) ? tips.title : ''
  const tipsContent = _.isObject(tips) ? tips.content : tips

  return (
    <View>
      <View className={rootClass}>
        <View onClick={show}>
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

import React, { useState } from 'react'
import { Text, View } from '@tarojs/components'
import { noop } from '@/nice-router/nice-router-util'
import CardTemplate from './card-template'
import './styles.scss'

function ObjectPickerItem(props) {
  const [checked, setChecked] = useState(false)
  const { onItemPress = noop, item } = props
  const handleChecked = () => {
    onItemPress(item, setChecked)

    // setChecked((pre) => {
    //   const value = !pre
    //
    //   return value
    // })
  }

  return (
    <View className='object-picker-item' onClick={handleChecked}>
      <View className='object-picker-item-option'>
        <Text className={`iconfont iconfont-radio${checked ? '-checked' : ''}`} />
      </View>
      <CardTemplate {...props} />
    </View>
  )
}

export default ObjectPickerItem

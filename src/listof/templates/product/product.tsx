import React from 'react'
import { isNotEmpty } from '@/nice-router/nice-router-util'

import ServerImage from '@/server-image/server-image'
import { Text, View } from '@tarojs/components'
import ListofUtil from '../../listof-util'
import './styles.scss'
import EleTag from '@/components/elements/ele-tag/ele-tag'

function Product(props) {
  const { item = {} } = props
  const { preTag = '', tags = [], brand = '', name, price } = item
  const src = ListofUtil.getImageUrl(item)

  return (
    <View className='product'>
      <View className='product-cover'>
        <ServerImage className='product-cover-image' src={src} mode='aspectFill' />
      </View>

      <View className='product-info'>
        <Text className='product-info-title'>
          <Text className='product-info-title-tag'>{preTag}</Text>
          <Text className='product-info-title-txt'> {`${brand} ${name}`}</Text>
        </Text>

        <View className='product-info-brief'>
          <Text numberOfLines={1}>{`￥${price}`}</Text>
          {tags.map((it) => isNotEmpty(it) && <EleTag title={it} mode='primary' size='small' />)}
        </View>
      </View>
    </View>
  )
}

export default Product

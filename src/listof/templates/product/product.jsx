import React from 'react'
import { isNotEmpty } from '@/nice-router/nice-router-util'

import ServerImage from '@/server-image/server-image'
import { Text, View } from '@tarojs/components'
import { AtTag } from 'taro-ui'
import ListofUtil from '../../listof-util'
import './styles.scss'

function Product(props) {
  const { item = {} } = props
  const { preTag = '', tags = [], brand = '', name, price } = item
  const src = ListofUtil.getImageUrl(item)

  return (
    <View className='product'>
      <View className='product-cover'>
        <ServerImage className='product-cover-image' src={src} mode='heightFix' />
      </View>

      <View className='product-info'>
        <View className='product-info-title'>
          {isNotEmpty(preTag) && (
            <AtTag className='red-tag' size='small' active>
              {preTag}
            </AtTag>
          )}
          <Text className='product-info-title-txt'>{`${brand} ${name}`}</Text>
        </View>

        <View className='product-info-brief'>
          <Text numberOfLines={1}>{`￥${price}`}</Text>
          {tags.map(
            (it) =>
              isNotEmpty(it) && (
                <AtTag className='tag-tiny' key={it} size='small' active>
                  {it}
                </AtTag>
              )
          )}
        </View>
      </View>
    </View>
  )
}

export default Product

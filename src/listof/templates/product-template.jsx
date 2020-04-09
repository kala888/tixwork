import { Text, View } from '@tarojs/components'
import { AtTag } from 'taro-ui'

import ServerImage from '@/server-image/server-image'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import { getImageUrl } from '../listof-helper'
import './styles.scss'

function ProductTemplate(props) {
  const { item = {} } = props
  const { preTag = '', tags = [], brand, name, price } = item
  const src = getImageUrl(item)

  return (
    <View className='product'>
      <View className='product-img'>
        <View className='product-img-container'>
          <ServerImage src={src} mode='heightFix' />
        </View>
      </View>

      <View class='product-content'>
        <View className='product-content-title'>
          {isNotEmpty(preTag) && (
            <AtTag className='red-tag' size='small' active>
              {preTag}
            </AtTag>
          )}
          <Text className='product-content-title-txt'>{`${brand} ${name}`}</Text>
        </View>

        <View className='product-content-brief'>
          <Text numberOfLines={1}>{`￥${price}`}</Text>
          {tags.map(
            (it) =>
              isNotEmpty(it) && (
                <AtTag className='red-tag-tiny' key={it} size='small' active>
                  {it}
                </AtTag>
              )
          )}
        </View>
      </View>
    </View>
  )
}

ProductTemplate.options = {
  addGlobalClass: true,
}
export default ProductTemplate

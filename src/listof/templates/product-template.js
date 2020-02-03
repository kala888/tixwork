import Taro from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import { AtTag } from 'taro-ui'

import ServerImage from '@/components/image/server-image'
import '../listof.scss'
import { getImageUrl } from '../listof-helper'

export default class ProductTemplate extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  render() {
    const { item = {} } = this.props
    const { preTag = '', tags = [], brand, name, price } = item
    const src = getImageUrl(item)

    return (
      <View className='product'>
        <View className='product-img'>
          <ServerImage src={src} />
        </View>
        <View class='content'>
          <View className='content-title'>
            {preTag.length > 0 && (
              <AtTag className='red-tag' size='small' active>
                {preTag}
              </AtTag>
            )}
            <Text style={{ marginLeft: '10px' }}>{`${brand} ${name}`}</Text>
          </View>
          <View className='content-brief'>
            <Text numberOfLines={1}>{`￥${price}`}</Text>
            {tags.map(
              (it) =>
                it.length > 0 && (
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
}

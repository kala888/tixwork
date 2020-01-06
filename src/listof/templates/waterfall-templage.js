import Taro from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import ServerImage from '@/components/image/server-image'
import '../listof.scss'
import { getImageUrl } from '../listof-helper'

export default class Waterfall extends Taro.PureComponent {
  render() {
    const { item = {}, horizontal } = this.props
    const { title, brief } = item
    const src = getImageUrl(item)

    const rootClass = classNames('waterfall', { horizontal })

    return (
      <View className={rootClass}>
        <ServerImage my-class='waterfall-img' src={src} />

        <View class='content'>
          <Text className='content-title' numberOfLines={1}>
            {title}
          </Text>
          <Text className='content-brief' numberOfLines={1}>
            {brief}
          </Text>
        </View>
      </View>
    )
  }
}

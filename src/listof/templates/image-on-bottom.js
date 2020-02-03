import Taro from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import ServerImage from '@/components/image/server-image'
import '../listof.scss'
import { getImageUrl } from '../listof-helper'

export default class ImageOnBottomTemplate extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  render() {
    const { item = {} } = this.props
    const { title, brief } = item
    const src = getImageUrl(item)

    return (
      <View className='image-on-bottom'>
        <View className='content'>
          <Text className='content-title' numberOfLines={1}>
            {title}
          </Text>
          <Text className='content-brief' numberOfLines={1}>
            {brief}
          </Text>
        </View>
        <ServerImage className='bottom-image' customStyle={{ width: '100%', height: '400rpx' }} src={src} />
      </View>
    )
  }
}

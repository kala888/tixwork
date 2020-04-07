import Taro from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import ServerImage from '@/server-image/server-image'
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
      <View className='auto image-on-bottom'>
        <View className='auto-content'>
          <Text className='auto-content-title' numberOfLines={1}>
            {title}
          </Text>
          <Text className='auto-content-brief' numberOfLines={1}>
            {brief}
          </Text>
        </View>
        <ServerImage className='auto-content-image' src={src} />
      </View>
    )
  }
}

import Taro from '@tarojs/taro'

import { Text, View } from '@tarojs/components'
import ServerImage from '@/components/image/server-image'
import '../../listof.scss'
import { getImageUrl } from '../../listof-helper'

export default class ProjectTemplate extends Taro.PureComponent {
  render() {
    const { item = {} } = this.props
    const { title, description, brief, location } = item
    const src = getImageUrl(item)

    return (
      <View className='project-template'>
        <View className='left-image'>
          <ServerImage mode='widthFix' src={src} />
        </View>
        <View className='content'>
          <Text className='content-title' numberOfLines={1}>
            {title}
          </Text>
          <Text className='content-brief' numberOfLines={3}>
            {brief || description}
          </Text>
          <Text className='content-brief, content-location' numberOfLines={1}>
            {location}
          </Text>
        </View>
      </View>
    )
  }
}

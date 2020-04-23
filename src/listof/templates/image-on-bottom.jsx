import { Text, View } from '@tarojs/components'
import ServerImage from '@/server-image/server-image'

import { getImageUrl } from '../listof-helper'
import './styles.scss'

function ImageOnBottom(props) {
  const { item = {} } = props
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

ImageOnBottom.options = {
  addGlobalClass: true,
}

export default ImageOnBottom

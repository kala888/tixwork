import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import ServerImage from '@/server-image/server-image'

import { getImageUrl } from '../listof-helper'
import './styles.scss'

function ImageOnTop(props) {
  const { item = {}, horizontal, waterfall } = props
  const { title, brief } = item
  const src = getImageUrl(item)

  const rootClass = classNames('auto', 'image-on-top', { horizontal, waterfall })

  return (
    <View className={rootClass}>
      {src && (
        <View className='auto-content-image'>
          <ServerImage src={src} />
        </View>
      )}
      <View class='auto-content'>
        <Text className='auto-content-title' numberOfLines={1}>
          {title}
        </Text>
        <Text className='auto-content-brief' numberOfLines={1}>
          {brief}
        </Text>
      </View>
    </View>
  )
}

ImageOnTop.options = {
  addGlobalClass: true,
}

export default ImageOnTop

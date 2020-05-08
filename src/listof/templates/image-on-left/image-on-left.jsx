import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import ServerImage from '@/server-image/server-image'
import { isNotEmpty } from '@/nice-router/nice-router-util'

import { getImageUrl } from '../../listof-helper'
import './styles.scss'

//mode=square,circle
//level=default,normal,primary,warn,danger,

function ImageOnLeft(props) {
  const { item = {}, mode: globalMode = [] } = props
  const { title, brief, flag = '' } = item
  const { level = 'default', mode = 'square' } = item

  const imageUrl = getImageUrl(item)
  const hasImage = isNotEmpty(imageUrl)
  let extClass = globalMode
    .concat(mode, hasImage ? 'no-bg' : level)
    .filter((it) => isNotEmpty(it))
    .map((it) => 'image-on-left_' + it)

  const rootClass = classNames('image-on-left', extClass)
  console.log('image on left', rootClass)
  return (
    <View className={rootClass}>
      <View className='image-on-left-flag'>
        {hasImage ? (
          <ServerImage my-class='image-on-left-flag-image' src={imageUrl} size='middle' />
        ) : (
          <Text className='image-on-left-flag-txt'>{flag}</Text>
        )}
      </View>
      <View className='image-on-left-info'>
        <Text className='image-on-left-info-title'>{title}</Text>
        <Text className='image-on-left-info-brief'>{brief}</Text>
      </View>
    </View>
  )
}

ImageOnLeft.options = {
  addGlobalClass: true,
}

export default ImageOnLeft

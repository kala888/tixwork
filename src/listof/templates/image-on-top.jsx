import Taro from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import ServerImage from '@/server-image/server-image'
import '../listof.scss'
import { getImageUrl } from '../listof-helper'

export default class ImageOnTop extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  render() {
    const { item = {}, horizontal, waterfall } = this.props
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
}

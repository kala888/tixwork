import Taro from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import ServerImage from '@/components/image/server-image'
import { formatTime } from '@/utils/index'
import '../listof.scss'
import { getImageUrl } from '../listof-helper'

export default class ArticleTemplate extends Taro.PureComponent {
  static defaultProps = {
    item: {},
  }

  render() {
    const { item = {}, className } = this.props
    const { title, brief, createTime } = item.article || item
    const src = getImageUrl(item)

    const rootClass = classNames('article', className)

    return (
      <View className={rootClass}>
        <View className='image-item'>
          <ServerImage customStyle={{ width: '100%', height: '100%' }} mode='aspectFit' src={src} />
        </View>

        <View className='content'>
          <Text className='content-title' numberOfLines={1}>
            {title}
          </Text>
          <Text className='content-brief' numberOfLines={1}>
            {brief}
          </Text>
          <Text className='content-time' numberOfLines={1}>
            {formatTime(createTime)}
          </Text>
        </View>
      </View>
    )
  }
}

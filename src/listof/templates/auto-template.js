import Taro from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import ServerImage from '@/components/image/server-image'
import m_ from '@/utils/mini-lodash'
import { formatTime } from '@/utils/index'
import '../listof.scss'
import { getImageList } from '../listof-helper'

export default class AutoTemplate extends Taro.PureComponent {
  render() {
    const { item = {}, showImageCount = 3 } = this.props
    const { title, brief, displayTime } = item

    let list = []
    if (showImageCount > 0) {
      const tempList = getImageList(item)
      const size = m_.min([showImageCount, tempList.length])
      list = m_.slice(tempList, 0, size)
      // const list = m_.concat(m_.slice(tempList, 0, size), m_.slice(tempList, 0, size), m_.slice(tempList, 0, size))
      console.log('list', list)
    }

    return (
      <View className='auto'>
        <View class='content'>
          <Text className='content-title' numberOfLines={1}>
            {title}
          </Text>
          <Text className='content-brief' numberOfLines={1}>
            {brief}
          </Text>
          {displayTime && (
            <Text className='content-brief' numberOfLines={1}>
              {formatTime(displayTime)}
            </Text>
          )}
        </View>
        {list.length > 0 && (
          <View className='image-list'>
            {list.map((it, index) => (
              <View key={it.id} className='image-item' style={{ marginLeft: index === 0 ? 0 : '5rpx' }}>
                <View style={{ width: '100%', height: '100%' }}>
                  <ServerImage style={{ width: '100%', height: '100%' }} src={it.imageUrl} />
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    )
  }
}

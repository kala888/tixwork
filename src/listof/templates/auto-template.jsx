import { Text, View } from '@tarojs/components'
import ServerImage from '@/server-image/server-image'
import { formatTime } from '@/utils/index'
import classNames from 'classnames'
import '../listof.scss'
import { getImageList } from '../listof-helper'

function AutoTemplate(props) {
  const { item = {}, showImageCount = 3 } = props
  const { title, brief, displayTime } = item

  let list = []
  if (showImageCount > 0) {
    const tempList = getImageList(item)
    const size = Math.min(showImageCount, tempList.length)
    list = tempList.slice(0, size)
    // const list = m_.concat(m_.slice(tempList, 0, size), m_.slice(tempList, 0, size), m_.slice(tempList, 0, size))
    // console.log('list', list)
  }

  const onlyTitleCls = !(brief || displayTime)
  const rootCls = classNames('auto', {
    'only-title': onlyTitleCls,
  })

  return (
    <View className={rootCls}>
      {list.length > 0 && (
        <View className='auto-image-list'>
          {list.map((it, index) => {
            const { id } = it
            return (
              <View key={id} className='auto-image-list-item' style={{ marginLeft: index === 0 ? 0 : '5rpx' }}>
                <ServerImage src={it.imageUrl} />
              </View>
            )
          })}
        </View>
      )}

      <View class='auto-content'>
        <Text className='auto-content-title' numberOfLines={1}>
          {title}
        </Text>
        {brief && (
          <Text className='auto-content-brief' numberOfLines={1}>
            {brief}
          </Text>
        )}
        {displayTime && (
          <Text className='auto-content-brief' numberOfLines={1}>
            {formatTime(displayTime)}
          </Text>
        )}
      </View>
    </View>
  )
}

AutoTemplate.options = {
  addGlobalClass: true,
}
export default AutoTemplate

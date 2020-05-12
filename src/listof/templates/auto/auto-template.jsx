import React from 'react'
import ServerImage from '@/server-image/server-image'
import { Text, View } from '@tarojs/components'
import classNames from 'classnames'

import ListofUtil from '../../listof-util'
import './styles.scss'

function AutoTemplate(props) {
  const { item, showImageCount, mode = [] } = props
  const { title, brief } = item

  let list = []
  if (showImageCount > 0) {
    const tempList = ListofUtil.getImageList(item)
    const size = Math.min(showImageCount, tempList.length)
    list = tempList.slice(0, size)
  }

  const rootCls = classNames(
    'auto',
    {
      'only-title': !brief,
    },
    mode
  )

  return (
    <View className={rootCls}>
      {list.length > 0 && (
        <View className='auto-image-list'>
          {list.map((it, index) => {
            const { id } = it
            return (
              <View key={id} className='auto-image-list-item' style={{ marginLeft: index === 0 ? 0 : '5rpx' }}>
                <ServerImage customStyle={{ width: '100%', height: '100%' }} src={it.imageUrl} />
              </View>
            )
          })}
        </View>
      )}

      <View className='auto-info'>
        <Text className='auto-info-title'>{title}</Text>
        {brief && <Text className='auto-info-brief'>{brief}</Text>}
      </View>
    </View>
  )
}

AutoTemplate.defaultProps = {
  item: {},
  showImageCount: 3,
}

export default AutoTemplate

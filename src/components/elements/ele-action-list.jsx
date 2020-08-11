import React from 'react'
import ServerImage from '@/server-image/server-image'
import { Text, View } from '@tarojs/components'
import classNames from 'classnames'

import EleButton from './ele-button'
import './styles.scss'

function EleActionList({ list, customStyle, className }) {
  const rootClass = classNames('ele-action-list', className)

  return (
    <View className={rootClass} style={customStyle}>
      {list.map((it) => {
        const { customStyle: actionStyle = {}, id, code } = it

        return (
          <View key={id + code} className='ele-action-list-btn-wrapper'>
            <EleButton
              {...it}
              size='small'
              circle
              title=''
              customStyle={{ ...actionStyle }}
              className='ele-action-list-btn'
            >
              <View className='ele-action-list-btn-container'>
                {it.imageUrl && <ServerImage className='ele-action-list-btn-image' src={it.imageUrl} />}
                <Text> {it.title}</Text>
              </View>
            </EleButton>
          </View>
        )
      })}
    </View>
  )
}

EleActionList.defaultProps = {
  list: [],
  className: null,
  customStyle: {},
}

export default EleActionList

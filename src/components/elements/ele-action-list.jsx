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
        const { customStyle: actionStyle = {}, id, extraData } = it

        return (
          <View key={id} className='ele-action-list-btn-wrapper'>
            <EleButton
              uiType={it.uiType}
              btnType={it.btnType}
              linkToUrl={it.linkToUrl}
              size='small'
              circle
              customStyle={{ ...actionStyle }}
              disabled={it.disabled}
              onClick={it.onClick}
              extraData={extraData}
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

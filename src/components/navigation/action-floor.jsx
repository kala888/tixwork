import React from 'react'
import { Block, View } from '@tarojs/components'
import ActionFloorItem from './action-floor-item'

import './action-floor.scss'

function ActionFloor({ actions = [] }) {
  if (actions.length === 0) {
    return <Block />
  }

  let actionList = actions
  if (actions.length >= 3) {
    const t1 = actions[3]
    const t2 = actions[4]
    actionList = [t1, t2].concat(actions)
  }

  const action1 = actionList[0]
  const action2 = actionList[1]
  const action3 = actionList[2]
  const action4 = actionList[3]
  const action5 = actionList[4]

  return (
    <View className='action-floor'>
      {action3 && (
        <View className='action-floor-first'>
          <View className='action-floor-first-left'>
            <View className='action-floor-item-container'>
              <ActionFloorItem action={action3} />
            </View>
          </View>

          <View className='action-floor-first-right'>
            <View className='action-floor-first-right-top'>
              <View className='action-floor-item-container'>
                <ActionFloorItem action={action4} />
              </View>
            </View>
            <View className='action-floor-first-right-bottom'>
              <View className='action-floor-item-container'>
                <ActionFloorItem action={action5} />
              </View>
            </View>
          </View>
        </View>
      )}
      {action1 && (
        <View className='action-floor-second'>
          <View className='action-floor-second-left'>
            <View className='action-floor-item-container'>
              <ActionFloorItem className='blue' action={action1} />
            </View>
          </View>

          {action2 && (
            <View className='action-floor-second-right'>
              <View className='action-floor-item-container'>
                <ActionFloorItem className='blue' action={action2} />
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  )
}

export default ActionFloor

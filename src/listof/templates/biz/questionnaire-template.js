import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import classNames from 'classnames'

import './styles.scss'

export default class QuestionnaireTemplate extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  render() {
    const { item = {} } = this.props
    const { org, group, totalUser, completed, risk, createTime = '2020-02-04' } = item
    const riskCls = classNames('questionnaire-body-item', { risk: risk > 0 })
    return (
      <View className='questionnaire'>
        <View className='questionnaire-title'>
          <View className='questionnaire-title-org'>
            {org}-{group}
          </View>
          <View className='questionnaire-title-time'>{createTime}</View>
        </View>
        <View className='questionnaire-body'>
          <View className='questionnaire-body-item'>
            <View className='questionnaire-body-item-icon'>
              <AtIcon value='user' />
            </View>
            <View className='questionnaire-body-item-txt'>共{totalUser}人</View>
          </View>
          <View className='questionnaire-body-item'>
            <View className='questionnaire-body-item-icon'>
              <AtIcon value='check' />
            </View>
            <View className='questionnaire-body-item-txt'>{completed}人完成</View>
          </View>
          <View className={riskCls}>
            <View className='questionnaire-body-item-icon'>
              <AtIcon value='bell' />
            </View>
            <View className='questionnaire-body-item-txt'>{risk}人风险</View>
          </View>
        </View>
        <View className='footer-button'>
          <View className='footer-button-btn'> </View>
        </View>
      </View>
    )
  }
}

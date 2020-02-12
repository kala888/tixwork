import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import classNames from 'classnames'

import { formatTime } from '@/utils/index'
import './styles.scss'

export default class SurveyTemplate extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  render() {
    const { item = {} } = this.props
    const { school, schoolClass, classSize, answerCount, riskCount, surveyTime } = item
    const riskCls = classNames('survey-body-item', { risk: riskCount > 0 })
    return (
      <View className='survey'>
        <View className='survey-title'>
          <View className='survey-title-org'>
            {school}-{schoolClass}
          </View>
          <View className='survey-title-time'>{formatTime(surveyTime)}</View>
        </View>
        <View className='survey-body'>
          <View className='survey-body-item'>
            <View className='survey-body-item-icon'>
              <AtIcon value='user' />
            </View>
            <View className='survey-body-item-txt'>共{classSize}人</View>
          </View>
          <View className='survey-body-item,green'>
            <View className='survey-body-item-icon'>
              <AtIcon value='check' />
            </View>
            <View className='survey-body-item-txt'>{answerCount}人完成</View>
          </View>
          <View className={riskCls}>
            <View className='survey-body-item-icon'>
              <AtIcon value='bell' />
            </View>
            <View className='survey-body-item-txt'>{riskCount}人风险</View>
          </View>
        </View>
        <View className='footer-button'>
          <View className='footer-button-btn'> </View>
        </View>
      </View>
    )
  }
}

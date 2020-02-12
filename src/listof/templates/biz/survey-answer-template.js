import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import TxtTable from '@/components/common/txt-table'

import { formatTime } from '@/utils/index'
import './styles.scss'

export default class SurveyAnswerTemplate extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  render() {
    const { item = {} } = this.props
    const { studentName, surveyTime, infoList = [] } = item
    return (
      <View className='survey-answer'>
        <View className='survey-title'>
          <View className='survey-title-name'>{studentName}</View>
          <View className='survey-title-time'>{formatTime(surveyTime)}</View>
        </View>
        <TxtTable list={infoList} />
      </View>
    )
  }
}

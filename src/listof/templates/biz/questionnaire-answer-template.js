import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import TxtTable from '@/components/common/txt-table'

import './styles.scss'

export default class QuestionnaireAnswerTemplate extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  render() {
    const { item = {} } = this.props
    const { name, createTime, infoList = [] } = item
    return (
      <View className='questionnaire-answer'>
        <View className='questionnaire-title'>
          <View className='questionnaire-title-name'>{name}</View>
          <View className='questionnaire-title-time'>{createTime}</View>
        </View>
        <TxtTable list={infoList} />
      </View>
    )
  }
}

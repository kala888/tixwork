import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import './styles.scss'

export default class OrgGroupTemplate extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  render() {
    const { item = {} } = this.props

    const { school, schoolClass, surveyCount, answerCount } = item
    return (
      <View className='org-group'>
        <View className='org-group-title'>{school}</View>
        <View className='org-group-body'>
          <View className='org-group-body-left'>{schoolClass}</View>
          <View className='org-group-body-right'>
            {surveyCount}次调查/{answerCount}次回复
          </View>
        </View>
      </View>
    )
  }
}

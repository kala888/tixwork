import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import './styles.scss'

export default class OrgGroupTemplate extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }
  render() {
    const { item = {} } = this.props
    const { org, group, totalQuestionnaire, totalReply } = item
    return (
      <View className='org-group'>
        <View className='org-group-title'>{org}</View>
        <View className='org-group-body'>
          <View className='org-group-body-left'>{group}</View>
          <View className='org-group-body-right'>
            {totalQuestionnaire}次调查/{totalReply}次回复
          </View>
        </View>
      </View>
    )
  }
}

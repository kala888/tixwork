import Taro from '@tarojs/taro'
import EleImage from '@/genericpage/elements/ele-image'
import { View } from '@tarojs/components'
import { formatTime } from '@/utils/index'

import '../../listof.scss'

export default class ProjectNotificationTemplate extends Taro.PureComponent {
  render() {
    const { item = {} } = this.props
    const { brief, sendEmployee = {}, createTime, title, content } = item
    const { employee = {}, employer = {} } = sendEmployee

    return (
      <View className='project-notification'>
        <View className='project-notification-user-info'>
          <EleImage src={employee.faceImage} className={['ele-avatar', 'tiny']} />

          <View className='project-notification-user-info-name'>
            {employee.name} | {employer.name}
          </View>
        </View>
        <View className='project-notification-title'>{title}</View>
        <View className='project-notification-brief'>{brief}</View>
        <View className='project-notification-content'>{content}</View>

        <View className='project-notification-time'>{formatTime(createTime, 'yyyy-MM-dd hh:mm:ss')}</View>
      </View>
    )
  }
}

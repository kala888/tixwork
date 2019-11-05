import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import '../../listof.scss'

export default class DailyReportTemplate extends Taro.PureComponent {
  render() {
    const { item = {} } = this.props
    const { title, brief, lastUpdateTime, reporter: { employee = {} } = {} } = item
    return (
      <View className='daily-report'>
        <View className='content'>
          <View className='content-title'>{title}</View>
          <View className='content-brief'>{brief}</View>
        </View>

        <View className='daily-report-reporter'>
          <View>{employee.name}</View>
          <View>{lastUpdateTime}</View>
        </View>
      </View>
    )
  }
}

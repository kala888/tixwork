import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './styles.scss'

export default class InfoLabel extends Taro.PureComponent {
  render() {
    const { title = '工程名称' } = this.props
    console.log(' this.props this.props this.props', this.props)
    return (
      <View className='info-label'>
        <View className='info-label-title'>{title}</View>
        <View className='info-label-value'>{this.props.children}</View>
      </View>
    )
  }
}

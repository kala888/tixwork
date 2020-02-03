import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import NavigationService from '@/nice-router/navigation.service'
import classNames from 'classnames'
import ServerImage from '@/components/image/server-image'
import './styles.scss'

// const defaultImageUrl = 'http://www.eastphoto.cn/indexImages/ep-012136603.jpg'

export default class ActionFloorItem extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  handleClick = () => {
    const { action } = this.props
    NavigationService.view(action)
  }

  render() {
    const { action, className } = this.props
    if (!action) {
      return null
    }
    const { title = 'action', brief = 'brief', imageUrl } = action
    const rootCls = classNames('action-floor-item', className)
    console.log(rootCls)
    return (
      <View className={rootCls} onClick={this.handleClick}>
        {imageUrl ? (
          <View className='action-floor-item-image'>
            <ServerImage mode='scaleToFill' src={imageUrl} />
          </View>
        ) : (
          <View className='action-floor-item-title'>{title}</View>
        )}
        <View className='action-floor-item-brief'>
          <View className='action-floor-item-brief-txt'> {brief}</View>
        </View>
      </View>
    )
  }
}

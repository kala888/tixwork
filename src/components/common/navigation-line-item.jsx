import Taro from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import NavigationService from '@/nice-router/navigation.service'

import './styles.scss'

export default class NavigationLineItem extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  handleClick = () => {
    NavigationService.view(this.props.linkToUrl)
  }

  render() {
    const { imageUrl, title, brief } = this.props
    return (
      <View className='navigation-line-item' onClick={this.handleClick}>
        <View className='navigation-line-item-preicon' />
        <View className='navigation-line-item-content'>
          <View className='navigation-line-item-content-brief'>{brief}</View>
          <View className='navigation-line-item-content-title'>{title}</View>
        </View>
        <Image className='navigation-line-item-image' src={imageUrl} />
      </View>
    )
  }
}

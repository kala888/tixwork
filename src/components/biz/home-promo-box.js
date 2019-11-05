import Taro from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import EleHelper from '@/genericpage/ele-helper'
import NavigationService from '@/nice-router/navigation.service'
import './styles.scss'

export default class HomePromoBox extends Taro.PureComponent {
  handleClick = () => {
    NavigationService.view(this.props.linkToUrl)
  }

  render() {
    const { icon, title, brief, className } = this.props
    const rootClass = EleHelper.classNames('home-promo-box', className)
    return (
      <View className={rootClass} onClick={this.handleClick}>
        <View className='home-promo-box-txt-en'>{brief}</View>
        <View className='home-promo-box-txt'>{title}</View>
        <View className='home-promo-box-img'>
          <Image mode='widthFix' src={icon} />
        </View>
      </View>
    )
  }
}

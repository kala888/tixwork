import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Config from '@/utils/config'
import WelcomeCarousel from '@/components/common/welcome-carousel'
import NavigationService from '@/nice-router/navigation.service'
import EleStoreLocationBig from '@/genericpage/elements/ele-store-location-big'

import './home.scss'

const defaultImageUrl = 'http://www.eastphoto.cn/indexImages/ep-012136603.jpg'
@connect(({ home }) => ({ ...home }))
export default class HomePage extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  componentDidMount() {
    NavigationService.view(Config.api.FooterHome)
  }

  render() {
    const { welcomeSlides = [] } = this.props

    return welcomeSlides.length > 0 ? (
      <WelcomeCarousel items={welcomeSlides} />
    ) : (
      <View className='home-page'>
        <EleStoreLocationBig
          address='中国人民共和国卫生部'
          imageUrl={defaultImageUrl}
          name='kala'
          phoneNumber='13880964614'
        />
        <View>home page:{JSON.stringify(this.props)}</View>
      </View>
    )
  }
}

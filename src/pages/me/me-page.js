import Taro from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import NavigationService from '@/nice-router/navigation.service'
import Config from '@/utils/config'
import './me.scss'

const defaultAvatar = 'http://www.eastphoto.cn/indexImages/ep-012136603.jpg'

@connect(({ me }) => ({ ...me }))
export default class MePage extends Taro.PureComponent {
  componentDidMount() {
    NavigationService.view(Config.api.FooterMe)
  }

  handleOpenProfile = () => {
    const { userInfo } = this.props
    NavigationService.view(userInfo)
  }

  render() {
    const { name, brief, imageUrl } = this.props

    return (
      <View className='me-page'>
        <View className='me-page-header'>
          <View className='me-page-header-top'>
            <View className='avatar' onClick={this.handleOpenProfile}>
              <Image src={imageUrl || defaultAvatar} />
            </View>

            <View className='content'>
              <View className='content-name'>{name}</View>
              <View className='content-brief'>{brief}</View>
            </View>
          </View>
          <View className='me-page-header-footer' />
        </View>
        <View className='me-page-body' />
      </View>
    )
  }
}

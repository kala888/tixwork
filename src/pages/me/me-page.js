import Taro from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import NavigationService from '@/nice-router/navigation.service'
import Config from '@/utils/config'
import './me.scss'

import buildingIcon from '../../assets/icon/icon_loupan@2x.png'
import commerceIcon from '../../assets/icon/icon_liansuo@2x.png'

const defaultAvatar = 'http://www.eastphoto.cn/indexImages/ep-012136603.jpg'

const Box_Navigator_List = [
  {
    code: 'FINE_DECORATION',
    icon: buildingIcon,
    title: '发起申请',
  },
  {
    code: 'BIZ_CHAIN',
    icon: commerceIcon,
    title: '我发起',
  },
]

const LineItem_Navigator_List = [
  {
    code: 'my-wrong-list',
    imageUrl: defaultAvatar,
    title: '我参与的项目',
  },
  {
    code: 'my-favorite-list',
    icon: commerceIcon,
    title: '我的收藏',
  },
]

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
    const {
      name,
      brief,
      imageUrl,
    } = this.props

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
          <View className='me-page-header-footer'>
          </View>
        </View>
        <View className='me-page-body'>

        </View>
      </View>
    )
  }
}

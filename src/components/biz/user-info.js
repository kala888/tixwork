import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import EleImage from '@/genericpage/elements/ele-image'
import EleHelper from '@/genericpage/ele-helper'
import './styles.scss'

const defaultImageUrl = 'http://www.eastphoto.cn/indexImages/ep-012136603.jpg'

class UserInfo extends Taro.PureComponent {
  render() {
    const { avatar = defaultImageUrl, name, role, small = true } = this.props
    const avatarClass = EleHelper.classNames('ele-avatar', {
      small,
    })
    return (
      <View className='user-info'>
        <EleImage src={avatar} className={avatarClass} />
        <View className='user-info-content'>
          <View className='user-info-content-name'>{name}</View>
          <View className='user-info-content-role'>{role}</View>
        </View>
      </View>
    )
  }
}

export default UserInfo

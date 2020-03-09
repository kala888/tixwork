import Taro from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import ServerImage from '@/components/image/server-image'
import '../listof.scss'

export default class UserTemplate extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  render() {
    const { item = {} } = this.props
    const { title, brief, imageUrl } = item

    return (
      <View className='user'>
        <View className='user-avatar' onClick={this.handleOpenProfile}>
          <ServerImage my-class='user-avatar-image' src={imageUrl} />
        </View>
        <View className='user-info'>
          <Text className='user-info-title'>{title}</Text>
          <Text className='user-info-brief'>{brief}</Text>
        </View>
      </View>
    )
  }
}

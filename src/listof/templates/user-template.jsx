import { Text, View } from '@tarojs/components'
import ServerImage from '@/server-image/server-image'

import './styles.scss'

function UserTemplate(props) {
  const { item = {} } = props
  const { title, brief, imageUrl } = item

  return (
    <View className='user'>
      <View className='user-avatar'>
        <ServerImage my-class='user-avatar-image' src={imageUrl} size='middle' />
      </View>
      <View className='user-info'>
        <Text className='user-info-title'>{title}</Text>
        <Text className='user-info-brief'>{brief}</Text>
      </View>
    </View>
  )
}

UserTemplate.options = {
  addGlobalClass: true,
}
export default UserTemplate

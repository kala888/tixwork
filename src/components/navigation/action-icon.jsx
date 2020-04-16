import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import classNames from 'classnames'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import ServerImage from '@/server-image/server-image'

import './styles.scss'

function ActionIcon({ icon, imageUrl, className }) {
  const rootClass = classNames('action-icon', className)
  return (
    <View className={rootClass}>
      {isNotEmpty(icon) ? (
        <AtIcon prefixClass='iconfont' value={icon} />
      ) : (
        <ServerImage mode='widthFix' src={imageUrl} />
      )}
    </View>
  )
}

ActionIcon.options = {
  addGlobalClass: true,
}
export default ActionIcon

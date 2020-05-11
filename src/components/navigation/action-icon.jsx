import { isNotEmpty } from '@/nice-router/nice-router-util'
import ServerImage from '@/server-image/server-image'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import './styles.scss'

/**
 *  有icon，优先展示ICON
 * @param icon
 * @param imageUrl
 * @param className
 * @param mode
 * @returns {*}
 * @constructor
 */
function ActionIcon({ icon, imageUrl, className, mode }) {
  const rootClass = classNames('action-icon', className)
  return (
    <View className={rootClass}>
      {isNotEmpty(imageUrl) ? (
        <View className={`iconfont ${icon}`} />
      ) : (
        <ServerImage customStyle={{ width: '100%', height: '100%' }} mode={mode} src={imageUrl} />
      )}
    </View>
  )
}

ActionIcon.options = {
  addGlobalClass: true,
}
export default ActionIcon

import React from 'react'
import { View } from 'react-native'
import { Badge } from '@ant-design/react-native'

const IconWithBadge = ({ children, badgeCount, ...props }) => {
  return (
    <View style={{ width: 24, height: 24, margin: 5 }}>
      {children}
      <Badge
        {...props}
        style={{ position: 'absolute', right: -6, top: -3 }}
        text={badgeCount}
      />
    </View>
  )
}

export default IconWithBadge

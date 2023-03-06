import React from 'react'
import _ from 'lodash'
import IconFont from '../iconfont'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import colors from '@/utils/colors'
import { IconLike, ImageLike } from '@/nice-router/nice-router-types'
import { isEmpty, isNotEmpty } from '@/nice-router/nice-router-util'
import ServerImage, { ServerImageProps } from '@/server-image/server-image'
import { StyleSheet } from 'react-native'


type ActionIconType = {
  color?: string
  size?: number
  style?: Record<string, any>
} & IconLike & ImageLike & ServerImageProps;


const getType = (icon = ''): {
  type?: string,
  value: any
} => {
  if (icon.startsWith('http://') || icon.startsWith('https://')) {
    return {
      type: 'image',
      value: icon,
    }
  }
  const groups = /(\w+)-(.*)/.exec(icon)
  return { type: _.get(groups, 1), value: _.get(groups, 2, icon) }
}


export default function ActionIcon(props: ActionIconType) {
  const { icon, size = 18, imageUrl, color = colors.textColor, mode, style = {} } = props

  if (isEmpty(icon) && isEmpty(imageUrl)) {
    return null
  }

  if (isNotEmpty(icon)) {
    const { type, value } = getType(icon)
    if (type === 'iconfont') {
      return (<IconFont name={value} size={style.fontSize || size} color={style.color || color} />)
    }
    if (type === 'antd') {
      return (
        <AntDesignIcon name={value} size={size} color={color} style={style} />
      )
    }
    return <FontAwesome5 name={value} size={size} color={color} style={style} />
  }
  return <ServerImage style={[styles.image, { width: size, height: size }, style]} mode={mode} src={imageUrl} />
}


const styles = StyleSheet.create({
  image: {
    width: 20,
    height: 20,
  },
})


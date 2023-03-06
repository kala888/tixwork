import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import colors from '@/utils/colors'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import ActionIcon from '@/components/action-icon'

export default function ImageItem(props) {
  const { imageUrl, onPress, onRemove } = props

  if (isNotEmpty(imageUrl)) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress}>
          <Image source={{ uri: imageUrl }} style={styles.img} />
        </TouchableOpacity>
        <View style={styles.removeButton}>
          <TouchableOpacity activeOpacity={0.7} onPress={onRemove}>
            <Text>移除</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <ActionIcon icon='iconfont-cameraadd' color={colors.textColorLighter} size={40} />
      </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 90,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: colors.borderColor,
    marginBottom: 10,
    marginHorizontal: 2,
  },
  img: {
    height: 90,
    width: 90,
    resizeMode: 'cover',
  },
  removeButton: {
    position: 'absolute',
    left: 0, bottom: 0, right: 0,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99999,
  },
})

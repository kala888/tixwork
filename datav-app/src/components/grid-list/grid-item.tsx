import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import NavigationService from '@/nice-router/navigation-service'
import ActionIcon from '@/components/action-icon'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import colors from '@/utils/colors'


export type GridItemType = {
  index?: number
  title?: string
  icon?: string
  imageUrl?: string
  linkToUrl?: string,
  disabled?: boolean,
  onPress?: (props: any) => void
  width?: number | string
  height?: number | string
}

const defaultWidth = '33%'
const defaultHeight = 140

const GridItem = (props: GridItemType) => {
  const {
    title = '', icon = '', linkToUrl = '', onPress, imageUrl, disabled = false,
    width = defaultWidth, height = defaultHeight,
    index,
  } = props

  const handleClick = () => {

    if (onPress) {
      onPress(props)
      return
    }
    //Alert.alert(linkToUrl)
    //NavigationService.navigate("H5Page",{linkToUrl:linkToUrl})
    NavigationService.view(linkToUrl)
  }
  const textClass = [
    styles.text,
    title.length >= 4 ? styles.smallText : {},
    disabled ? styles.disabled : {},
  ]

  const rootClass = [
    styles.container,
    { width, height },
    (index % 3 === 1 || index % 3 === 2) ? styles.noLeftBorder : {},
    (index > 2) ? styles.noTopBorder : {},
  ]

  return (
    <TouchableOpacity
      onPress={handleClick}
      style={rootClass}
      disabled={disabled}
    >
      <View style={styles.image}>
        <ActionIcon icon={icon} size={40} color={disabled ? '#ddd' : colors.primaryColor} />
        {
          isNotEmpty(imageUrl) && (<Image source={{ uri: imageUrl }} />)
        }
      </View>
      <View>
        <Text style={textClass}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  noLeftBorder: {
    borderLeftWidth: 0,
  },
  noTopBorder: {
    borderTopWidth: 0,
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#666',
    marginTop: 5,
    fontSize: 22,
  },
  smallText: {
    textAlign: 'center',
    marginTop: 3,
    fontSize: 18,
  },
  disabled: {
    color: '#ccc',
  },
})

export default GridItem

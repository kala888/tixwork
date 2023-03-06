import React from 'react'
import CardTemplate from './card-template'
import NavigationService from '@/nice-router/navigation-service'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import colors from '@/utils/colors'

function ObjectPickerPopupItem(props) {
  const { item } = props
  const handleClick = () => NavigationService.dispatch('objectPicker/removeSelectItem', item)
  return (
    <View style={styles.container}>
      <CardTemplate {...props} />
      <TouchableOpacity onPress={handleClick}>
        <Text style={styles.button}>
          移除
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default ObjectPickerPopupItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderColor: colors.borderColor,
  },
  button: {
    fontSize: 18,
    borderColor: colors.textColorLighter,
  },
})

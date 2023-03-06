import React from 'react'
import NavigationService from '@/nice-router/navigation-service'
import { EleCardProps } from '@/components/elements/ele-card/ele-card'
import CardTemplate from './card-template'
import { StyleSheet, TouchableOpacity } from 'react-native'
import ActionIcon from '@/components/action-icon'

type ObjectPickerItemItemProps = {
  checked?: boolean;
} & EleCardProps;

type ObjectPickerItemProps = {
  item: ObjectPickerItemItemProps;
}

function ObjectPickerItem(props: ObjectPickerItemProps) {
  const { item } = props
  const handleClick = () => NavigationService.dispatch('objectPicker/selectItem', item)
  return (
    <TouchableOpacity style={styles.container} onPress={handleClick}>
      <ActionIcon icon={`iconfont-radio${item.checked ? '-checked' : ''}`} />
      <CardTemplate {...props} />
    </TouchableOpacity>
  )
}

export default ObjectPickerItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
})

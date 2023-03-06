import React from 'react'
import NavigationService from '@/nice-router/navigation-service'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { ActionLike } from '@/nice-router/nice-router-types'
import ActionUtil from '@/nice-router/action-util'
import colors from '@/utils/colors'

type EleTextProps = {
  text: string;
  style?: any
} & ActionLike;

function EleText(props: EleTextProps) {
  const { text, style } = props
  const onClick = () => NavigationService.view(props)

  return (
    <TouchableOpacity onPress={onClick} disabled={ActionUtil.isActionLike(props)}>
      <Text style={[styles.container, style]}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}

export default EleText
const styles = StyleSheet.create({
  container: {
    fontSize: 16,
    lineHeight: 40,
    color: colors.textColorLight,
    textAlign:'right',
  },
})

import TextAreaItem from '@ant-design/react-native/es/textarea-item'
import React from 'react'
import colors from '@/utils/colors'
import { StyleSheet, View } from 'react-native'
import BorderedWrapper from '@/components/form/field/bordered-wrapper'

export default function EleTextarea(props) {
  return (
    <BorderedWrapper>
      <View style={{ width: '100%' }}>
        <TextAreaItem
          rows={4}
          style={styles.container}
          {...props}
        />
      </View>
    </BorderedWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    color: colors.textColor,
  },
})

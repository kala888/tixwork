import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ActionIcon from '@/components/action-icon'
import colors from '@/utils/colors'

type FormItemTailProps = {
  showClear?: boolean;
  hasError?: boolean;
  onClear: (e: any) => void;
  onShowError: (e: any) => void;
};

export default function FormItemTail(props: FormItemTailProps) {
  const { showClear, hasError, onClear, onShowError } = props

  return (
    <View style={styles.container}>
      {
        showClear && (
          <TouchableOpacity onPress={onClear} activeOpacity={0.7}>
            <ActionIcon icon='iconfont-close-circle' />
          </TouchableOpacity>
        )
      }
      {
        hasError && (
          <TouchableOpacity onPress={onShowError} activeOpacity={0.7}>
            <ActionIcon icon='iconfont-warning-circle' color={colors.orange} />
          </TouchableOpacity>
        )
      }
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 8,
    width: 30,
  },
})

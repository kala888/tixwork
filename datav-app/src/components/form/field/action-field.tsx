import React from 'react'
import { isEmpty, noop } from '@/nice-router/nice-router-util'
import _ from 'lodash'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ActionIcon from '@/components/action-icon'
import colors from '@/utils/colors'

type ActionFieldProps = {
  value: string | { title: string };
  placeholder?: string;
  disabled?: boolean;
  onPress?: Function;
  style?: any;
  toggleStatus?: boolean;
  children?: React.ReactNode;
};

function ActionField(props: ActionFieldProps) {
  const { value, placeholder, disabled, onPress = noop, toggleStatus } = props

  const handleClick = () => {
    if (!disabled) {
      onPress()
    }
  }

  const theValue = (value !== null && typeof value === 'object') ? value?.title : value

  const valueClass = [
    styles.value,
    isEmpty(theValue) ? styles.placeholder : {},
    disabled ? styles.disabled : {},
  ]

  return (

    <TouchableOpacity onPress={handleClick} disabled={disabled}>
      <View style={styles.container}>

        <View style={styles.content}>
          <Text style={valueClass}>{theValue || placeholder}</Text>
          {!disabled && props.children}
        </View>
        {!_.isNil(toggleStatus) && (
          <ActionIcon
            icon={toggleStatus ? 'iconfont-down' : 'iconfont-right'}
            color={'#ccc'} />
        )}
      </View>
    </TouchableOpacity>

  )
}

ActionField.defaultProps = {
  disabled: false,
  onPress: noop,
}
export default ActionField

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  content: {
    flex: 1,
  },
  value: {
    justifyContent: 'flex-end',
    color: colors.textColor,
  },
  placeholder: {
    color: '#ccc',
  },
  disabled: {
    opacity: 0.3,
  },
})

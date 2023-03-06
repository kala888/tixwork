import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Button } from '@ant-design/react-native'
import { ActionLike, EleObject, IconLike, ImageLike } from '@/nice-router/nice-router-types'
import { ButtonProps } from '@ant-design/react-native/lib/button'
import colors from '@/utils/colors'
import NavigationService from '@/nice-router/navigation-service'
import _ from 'lodash'

export type EleButtonProps = {
  style?: any,
  children?: React.ReactNode,
  mode?: 'normal' | 'warn' | 'danger' | 'info' | 'secondary' | 'radius0' | 'ghost';
} & IconLike &
  EleObject &
  ImageLike &
  ActionLike &
  Partial<ButtonProps>

// export type EleButtonProps = {
//   size?: 'small' | 'default';
//   type?: string;
//   ajax?: boolean;
//   disabled?: boolean;
//   openType?: string;
//   children?: React.ReactNode;
//   className?: string;
//   mode?: 'normal' | 'warn' | 'danger' | 'info' | 'secondary' | 'radius0' | 'ghost';
//   onGetPhoneNumber?: any;
// } & IconLike &
//   EleObject &
//   ImageLike &
//   ActionLike &
//   Omit<Button, 'type' | 'size' | 'id' | 'onPress'>;

function EleButton(props: EleButtonProps) {
  const { title, children, mode, onPress, linkToUrl, style, disabled, ...rest } = props

  const rootClass = [styles.container, styles[mode], style]

  const handlePress = _.debounce(() => {
    if (onPress) {
      onPress()
      return
    }
    if (linkToUrl) {
      NavigationService.view(props)
      return
    }
  }, 200)

  return (
    // @ts-ignore
    <Button style={rootClass} disabled={disabled} {...rest} onPress={handlePress}>
      {children ? children : <Text style={[styles.title, disabled ? {} : styles.disabled]}>{title}</Text>}
    </Button>
  )
}

export default EleButton

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryColor,
    borderColor: colors.brandDarkColor,
    paddingLeft: 4,
    paddingRight: 4,
  },
  title: {
    color: '#fff',
  },
  disabled: {
    color: '#bbb',
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
})

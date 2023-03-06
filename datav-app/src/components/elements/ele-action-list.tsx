import { StyleSheet, View } from 'react-native'
import React from 'react'
import EleButton, { EleButtonProps } from '@/components/elements/ele-button'
import { getExtMode } from '@/utils'

export type EleActionListProps = {
  style?: any
  buttonStyle?: any
  items?: EleButtonProps[];
  mode?: 'small' | 'right' | 'left' | 'full' | 'footer' | 'radius0' | 'footer-bar' | 'colorful' | string[];
};

export default function EleActionList(props: EleActionListProps) {
  const { items = [], mode, style } = props

  const isSmall = mode && (mode === 'small' || mode.includes('small'))
  const size = isSmall ? 'small' : undefined
  const rootClass = getExtMode('container', mode).styles(styles).concat(style)
  const isRight = mode && (mode === 'right' || mode.includes('right'))

  return (
    <View style={rootClass}>
      {
        items.map((it: any, idx) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { style: itemStyle, loading, ...rest } = it
          console.log('itemStyleitemStyle', itemStyle)
          const buttonStyle = [
            styles.button,
            isRight ? styles.rightButton : {},
            itemStyle,
          ]
          return (
            <EleButton
              key={`${it.id}_${idx}`}
              type='primary'
              size={size}
              {...rest}
              style={buttonStyle}
            >{it.title}</EleButton>
          )
        })
      }
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  right: {
    justifyContent: 'flex-end',
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
    paddingRight: 0,
    paddingLeft: 0,
    marginBottom: 10,
  },
  rightButton: {
    flex: null,
  },
})

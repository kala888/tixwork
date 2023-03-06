import React, { useEffect } from 'react'
import ActionUtil from '@/nice-router/action-util'
import NavigationService from '@/nice-router/navigation-service'
import { ActionLike, EleObject, IconLike, ImageLike } from '@/nice-router/nice-router-types'

import EleButton from '@/components/elements/ele-button'
import { useVisible } from '@/service/use-service'
import { StyleSheet, Text, View } from 'react-native'
import { isEmpty } from '@/nice-router/nice-router-util'
import colors from '@/utils/colors'
import ActionIcon from '@/components/action-icon'

type SectionBarProps = {
  children?: React.ReactNode;
  foldable?: boolean;
  expand?: boolean;
  mode?: 'bordered' | 'highlight' | string[];
  style?:any,
} & ActionLike &
  ImageLike &
  EleObject &
  IconLike;

/**
 * 可折叠，支持onPress和linkToUrl
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function SectionBar(props: SectionBarProps) {
  const { visible, toggle, show, close } = useVisible(true)

  const {
    title,
    brief,
    imageUrl,
    icon,
    disabled = false,
    foldable,
    expand = 'true',
    onPress,
    children,
    style,
    ...others
  } = props

  useEffect(() => {
    if (foldable) {
      if (expand) {
        show()
      } else {
        close()
      }
    }
  }, [foldable, expand, close, show])

  const isAction = ActionUtil.isActionLike(props)

  const handlePress = () => {
    if (disabled) {
      return
    }
    if (onPress) {
      onPress()
      return
    }
    if (foldable) {
      toggle()
      return
    }
    NavigationService.view(props)
  }


  let theIcon = isEmpty(icon) && isAction ? 'iconfont-right' : icon

  if (foldable) {
    theIcon = visible ? 'iconfont-up' : 'iconfont-down'
  }

  return (
    <View style={[styles.container,style]}>
      <View style={styles.header}>
        <View style={styles.prefix} />
        <View style={styles.title}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <EleButton style={styles.button} onPress={handlePress} {...others}>
          <View style={styles.buttonBody}>
            <View style={styles.brief}><Text style={styles.briefText}>{brief}</Text></View>
            <View style={styles.postfix}>
              <ActionIcon icon={theIcon} imageUrl={imageUrl} color={colors.textColor} />
            </View>
          </View>
        </EleButton>
      </View>
      {children && <View style={styles.body}>{children}</View>}
    </View>
  )
}

export default SectionBar

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prefix: {
    width: 4,
    borderRadius: 1,
    minHeight: 20,
    backgroundColor: colors.primaryColor,
    marginRight: 20,
  },
  title: {
    flex: 1,
  },
  titleText: {
    color: colors.textColor,
    fontWeight: '700',
    fontSize: 18,
  },

  button: {
    borderWidth: 0,
    paddingLeft: 0,
    paddingRight: 0,
    height: null,
    backgroundColor: 'transparent',
  },
  buttonBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  brief: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  briefText: {
    color: colors.textColor,
    fontSize: 16,
  },
  postfix: {
    alignItems: 'center',
    width: 22,
  },
})

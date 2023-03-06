import { isEmpty } from '@/nice-router/nice-router-util'
import ActionUtil from '@/nice-router/action-util'
import EleButton, { EleButtonProps } from '@/components/elements/ele-button'
import { StyleSheet, Text, View } from 'react-native'
import ActionIcon from '@/components/action-icon'
import React from 'react'
import colors from '@/utils/colors'
import device from '@/nice-router/device'


type NavigationLineProps = {
  secondTitle?: string;
  prefixIcon?: string;
  prefixImageUrl?: string;
} & EleButtonProps;

export default function NavigationLine(props: NavigationLineProps) {
  const { title, secondTitle, brief, icon, imageUrl, prefixIcon, prefixImageUrl, style, ...others } = props

  const useDefaultPrefix = isEmpty(prefixIcon) && isEmpty(prefixImageUrl)

  let showDefaultRightIcon = ActionUtil.isActionLike(props) && isEmpty(icon) && isEmpty(imageUrl)
  const theAction = showDefaultRightIcon ? 'iconfont-right' : icon

  return (
    <View>
      <EleButton mode='ghost' {...others} style={[{ marginTop: 4 }, style]}>
        <View style={styles.container}>
          <View style={styles.header}>
            {useDefaultPrefix ? (
              <View style={styles.headerPrefix} />
            ) : (
              <ActionIcon icon={prefixIcon} imageUrl={prefixImageUrl} />
            )}
          </View>

          <View style={styles.body}>
            <Text style={styles.title}>{title}</Text>
            {secondTitle && <Text style={styles.secondTitle}>{secondTitle}</Text>}
          </View>

          <View style={styles.footer}>
            <Text style={styles.brief}>{brief}</Text>
            <ActionIcon icon={theAction} imageUrl={imageUrl} size={20} color={colors.primaryColor} />
          </View>
        </View>
      </EleButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 5,
    borderRadius: 3,
    paddingHorizontal: 10,
    width: device.width - 30,
    borderColor: colors.borderColor,
    borderWidth: 0.5,

  },
  header: {
    marginRight: 10,
  },
  headerPrefix: {
    width: 4,
    height: 32,
    backgroundColor: colors.primaryColor,
    borderRadius: 3,
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  title: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textColor,
  },
  secondTitle: {
    fontSize: 12,
    color: colors.textColorLight,
    paddingTop: 6,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brief: {
    fontSize: 14,
    color: colors.textColorLight,
  },
})

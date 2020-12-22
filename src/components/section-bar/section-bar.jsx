import React, { useEffect } from 'react'
import ActionUtil from '@/nice-router/action-util'
import NavigationService from '@/nice-router/navigation-service'
import { Block, Text, View } from '@tarojs/components'
import classNames from 'classnames'

import { useVisible } from '@/service/use-service'
import { getExtMode, isNotEmpty } from '@/nice-router/nice-router-util'
import './styles.scss'

/**
 * 可折叠，支持onClick和linkToUrl
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function SectionBar(props) {
  const { title, brief, className, customStyle = {}, icon = 'right', mode = [], disabled = false } = props

  const { foldable, expand = 'true', onClick } = props
  const { visible, toggle, show, close } = useVisible(true)

  useEffect(() => {
    if (foldable) {
      if (expand) {
        show()
      } else {
        close()
      }
    }
  }, [foldable, expand])

  const hasMore = ActionUtil.isActionLike(props)

  const handleClick = () => {
    if (disabled) {
      return
    }
    if (onClick) {
      onClick()
      return
    }
    if (foldable) {
      toggle()
      return
    }
    NavigationService.view(props)
  }

  const rootClass = getExtMode(mode, {
    foldable,
    disabled,
  }).classNames('section-bar', className)

  const contentClass = classNames('section-bar-body', {
    hidden: !hasMore && !visible,
  })

  let actionAction = hasMore ? icon : ''
  let actionTitle = brief || (hasMore ? 'MORE' : '')

  if (foldable) {
    actionAction = visible ? 'up' : 'down'
  }

  return (
    <View className={rootClass} style={customStyle}>
      <View className='section-bar-header' onClick={handleClick}>
        {isNotEmpty(title) && (
          <Block>
            <View className='section-bar-prefix' />
            <View className='section-bar-title'>{title}</View>
          </Block>
        )}
        <View className='section-bar-action clickable'>
          {isNotEmpty(actionTitle) && <Text className='section-bar-action-title'>{actionTitle}</Text>}
          {isNotEmpty(actionAction) && <Text className={`iconfont iconfont-${actionAction}`} />}
        </View>
      </View>
      {props.children && <View className={contentClass}>{props.children}</View>}
    </View>
  )
}

export function BorderedSectionBar(props) {
  return <SectionBar foldable mode={['bordered', 'highlight']} {...props} />
}

export default SectionBar

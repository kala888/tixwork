import React from 'react'
import NavigationService from '@/nice-router/navigation-service'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import ActionUtil from '@/nice-router/action-util'
import { Text, View } from '@tarojs/components'
import _ from 'lodash'
import classNames from 'classnames'

import './styles.scss'

function InfoObjectLink(props) {
  const { id, title, brief } = props

  const onClick = _.debounce(() => {
    NavigationService.view(props, { id })
  }, 500)

  const rootClass = classNames('info-object-link', {
    clickable: ActionUtil.isActionLike(props),
  })

  return (
    <View className={rootClass} onClick={onClick}>
      <Text className='info-object-link-title'>{title}</Text>
      {isNotEmpty(brief) && <Text className='info-object-link-brief'>({brief})</Text>}
    </View>
  )
}

InfoObjectLink.defaultProps = {
  id: '',
  title: '',
  brief: '',
  linkToUrl: null,
}

export default InfoObjectLink

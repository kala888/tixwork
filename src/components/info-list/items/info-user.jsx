import React from 'react'
import NavigationService from '@/nice-router/navigation-service'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import ImageTools from '@/server-image/image-tools'
import ServerImage from '@/server-image/server-image'
import { Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import ActionUtil from '@/nice-router/action-util'
import _ from 'lodash'
import classNames from 'classnames'
import './styles.scss'

function InfoUser(props) {
  const { id, title, brief, imageUrl } = props

  const onClick = _.debounce(() => {
    NavigationService.view(props, { id })
  }, 500)

  const onImagePreview = () => {
    const url = ImageTools.getServerImagUrl(imageUrl, 'origin')
    Taro.previewImage({ urls: [url] })
  }

  const contentClass = classNames('info-user-content', {
    clickable: ActionUtil.isActionLike(props),
  })

  return (
    <View className='info-user'>
      <View className='info-user-avatar' onClick={onImagePreview}>
        <ServerImage src={imageUrl} size='middle' />
      </View>
      <View className={contentClass} onClick={onClick}>
        <Text className='info-user-content-title'>{title}</Text>
        {isNotEmpty(brief) && <Text className='info-user-content-brief'>{brief}</Text>}
      </View>
    </View>
  )
}

InfoUser.defaultProps = {
  id: '',
  title: '',
  brief: '',
  imageUrl: '',
  linkToUrl: null,
}

export default InfoUser

import React from 'react'
import NavigationService from '@/nice-router/navigation.service'
import { useAjaxPullDown, useAsyncEffect, usePageTitle } from '@/service/use.service'
import Config from '@/utils/config'
import { View } from '@tarojs/components'
import { Current, useShareAppMessage } from '@tarojs/taro'
import classNames from 'classnames'

import EleFlex from './ele-flex'
import './styles.scss'

function GenericPageBase(props) {
  const { pageTitle = Config.name, pageLinkToUrl = Config.api.FooterHome } = props
  usePageTitle(pageTitle)
  useAjaxPullDown(props)

  // q如果变化了，就发送一个后台请求
  const { q } = Current.router.params
  useAsyncEffect(() => {
    if (q) {
      const uri = decodeURIComponent(q)
      NavigationService.view(uri)
    }
  }, [q])

  useShareAppMessage((res) => {
    if (res.from === 'button') {
      const { target: { dataset = {} } = {} } = res
      const { share = {} } = dataset
      const { shareTitle, linkToUrl, imageUrl } = share
      const encodePath = encodeURIComponent(linkToUrl || pageLinkToUrl)
      return {
        title: shareTitle || pageTitle,
        path: `/pages/generic-page?q=${encodePath}`,
        imageUrl,
      }
    }
    const encodePath = encodeURIComponent(pageLinkToUrl)
    return {
      title: pageTitle,
      path: encodePath,
    }
  })

  const { className } = props
  const rootClass = classNames('generic-page', className)
  return (
    <View className={rootClass}>
      <EleFlex {...props} />
    </View>
  )
}

export default GenericPageBase

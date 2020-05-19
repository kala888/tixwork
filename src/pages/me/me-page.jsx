import React from 'react'
import NavigationBox from '@/components/navigation/navigation-box'
import NavigationLineItem from '@/components/navigation/navigation-line-item'
import MockService from '@/nice-router/request/mock-service'
import ServerImage from '@/server-image/server-image'
import { usePageTitle, usePullDown } from '@/service/use.service'
import Config from '@/utils/config'
import { View } from '@tarojs/components'
import { useSelector } from 'react-redux'
import { AtButton } from 'taro-ui'

import './me.scss'

const Box_Navigator_List = [
  {
    id: '4',
    code: 'FINE_DECORATION',
    imageUrl: MockService.randomImage(),
    title: '发起申请',
  },
  {
    id: '3',
    code: 'BIZ_CHAIN',
    icon: 'app-2',
    title: '我发起',
  },
]

const LineItem_Navigator_List = [
  {
    id: '1',
    code: 'my-wrong-list',
    icon: 'app',
    title: '我参与的项目',
  },
  {
    id: '2',
    code: 'my-favorite-list',
    icon: 'app-2',
    title: '我的收藏',
  },
]

function MePage() {
  const root = useSelector((state) => state.me)
  const { pageTitle } = root
  usePageTitle(pageTitle)
  usePullDown(Config.api.FooterMe)

  const handleUpdateProfileInfo = (e) => console.log('111', e)

  const {
    boxNavigatorList = Box_Navigator_List,
    lineItemNavigatorList = LineItem_Navigator_List,
    name = '用户A',
    brief = '超级管理员',
    avatar,
  } = root

  return (
    <View className='me-page'>
      <View className='me-page-header'>
        <View className='me-page-header-info'>
          <AtButton openType='getUserInfo' className='transparent-btn' onGetUserInfo={handleUpdateProfileInfo}>
            <ServerImage className='me-avatar' src={avatar || MockService.randomImage()} />
          </AtButton>

          <View className='me-title'>
            <View className='me-title-name'>{name}</View>
            <View className='me-title-brief'>{brief}</View>
          </View>
        </View>

        <View className='me-page-header-actions'>
          <NavigationBox list={boxNavigatorList} />
        </View>
      </View>

      <View className='me-page-body'>
        {lineItemNavigatorList.map((it) => (
          <NavigationLineItem key={`${it.id}_${it.code}`} {...it} />
        ))}
      </View>
    </View>
  )
}

export default MePage

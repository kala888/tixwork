import React, { useEffect, useState } from 'react'
import NavigationBox from '@/components/navigation/navigation-box'
import MockService from '@/nice-router/request/mock-service'
import ServerImage from '@/server-image/server-image'
import { usePageTitle, usePullDown } from '@/service/use-service'
import Config from '@/utils/config'
import { View } from '@tarojs/components'
import { useSelector } from 'react-redux'
import { useDidShow } from '@tarojs/runtime'
import { AtButton } from 'taro-ui'
import NavigationService from '@/nice-router/navigation-service'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import EleActionList from '@/components/elements/action-list/ele-action-list'
import Listof from '@/listof/listof'
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
  const [footerActionList, setFooterActionList] = useState([])

  usePageTitle(root)
  usePullDown(Config.api.FooterMe)
  useEffect(() => {
    NavigationService.ajax(Config.api.FooterMe)
  }, [])
  const handleGoLogin = () => NavigationService.navigate('/pages/login/login-page')
  const handleLogout = () => {
    NavigationService.dispatch('app/logout')
    NavigationService.dispatch('me/save', {})
    NavigationService.ajax(Config.api.Logout)
  }
  useEffect(() => {
    if (isNotEmpty(root)) {
      setFooterActionList([{ id: 1, title: '退出登录', onClick: handleLogout }])
    } else {
      setFooterActionList([{ id: 1, title: '去登陆', onClick: handleGoLogin }])
    }
  }, [root])
  useDidShow(() => NavigationService.ajax(Config.api.FooterMe))

  const handleUpdateProfileInfo = (e) => console.log('111', e)

  const {
    boxNavigatorList = Box_Navigator_List,
    navigationLineItems = LineItem_Navigator_List,
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
        <Listof items={navigationLineItems} displayMode='navigation-line' />
      </View>

      <EleActionList mode='full' list={footerActionList} />
    </View>
  )
}

export default MePage

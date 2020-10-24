import React from 'react'
import EleCarousel from '@/components/elements/ele-carousel'
import ActionFloor from '@/components/navigation/action-floor'
import SectionBar from '@/components/section-bar/section-bar'
import Listof from '@/listof/listof'
import { useAjaxPullDown, useAsyncEffect, usePageTitle } from '@/service/use.service'
import { View } from '@tarojs/components'
import { useSelector } from 'react-redux'
import NavigationService from '@/nice-router/navigation.service'

import './home.scss'

function HomePage(props) {
  const root = useSelector((state) => state.home)
  const { pageTitle } = root
  usePageTitle(pageTitle)
  useAjaxPullDown(props)

  useAsyncEffect(() => {
    NavigationService.ajax('mock-home-page/')
  })

  const { slideList = [], actionList = [], productList = [] } = root

  return (
    <View className='home-page'>
      <EleCarousel className='home-page-carousel' items={slideList} />
      <View className='home-page-action-floor'>
        <ActionFloor actions={actionList} />
        <SectionBar title='促销抢购' linkToUrl='page:///pages/biz/listof-test-page' />
        <Listof list={productList} displayMode='product' />
      </View>
    </View>
  )
}

export default HomePage

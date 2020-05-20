import React, { useState } from 'react'
import Listof from '@/listof/listof'
import NavigationService from '@/nice-router/navigation.service'
import { useAsyncEffect } from '@/service/use.service'
import { View } from '@tarojs/components'
import { useSelector } from 'react-redux'
import { AtSearchBar } from 'taro-ui'
import { Current } from '@tarojs/taro'

// TODO 这页面应该是一个特殊的listof

function ObjectPickerPage() {
  const root = useSelector((state) => state.objectPicker)
  const [keyword, setKeyword] = useState('')

  const {
    searchUrl,
    list,
    listMeta,
    displayMode,
    emptyMessage,
    style,
    dataContainer,
    articleList,
    articleListMeta,
  } = root

  // q如果变化了，就发送一个后台请求
  const { q } = Current.router.params
  useAsyncEffect(() => {
    if (q) {
      const uri = decodeURIComponent(q)
      NavigationService.view(uri)
    }
  }, [q])

  const handleItemPress = async (item) => {
    await NavigationService.back({ data: item }, this)
  }

  const onSearchActionClick = () => {
    NavigationService.ajax(searchUrl, { keyword })
  }

  return (
    <View className='object-picker'>
      <View className='object-picker-search-bar'>
        <AtSearchBar
          actionName='没找到，搜一下'
          value={keyword}
          onChange={setKeyword}
          onActionClick={onSearchActionClick}
        />
      </View>

      <Listof
        dataContainer={dataContainer}
        list={list || articleList}
        listMeta={listMeta || articleListMeta}
        displayMode={displayMode}
        emptyMessage={emptyMessage}
        isBigList
        height='100vh'
        style={style}
        onItemPress={handleItemPress}
      />
    </View>
  )
}

export default ObjectPickerPage

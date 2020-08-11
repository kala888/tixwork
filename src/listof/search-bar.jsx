import React from 'react'
import { View } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import { useAsyncEffect, useAsyncState } from '@/service/use.service'
import NavigationService from '@/nice-router/navigation.service'
import './search-bar.scss'

export default function SearchBar(props) {
  const [keyword, setKeyword] = useAsyncState('')
  const { title, extraData = {} } = props

  const { pKeyword = '', ...others } = extraData

  useAsyncEffect(() => {
    setKeyword(pKeyword)
  }, [pKeyword])
  const handleSearch = () => {
    NavigationService.ajax(props, { keyword })
  }
  return (
    <View className='search-bar'>
      <AtSearchBar value={keyword} onChange={setKeyword} actionName={title} onActionClick={handleSearch} {...others} />
    </View>
  )
}

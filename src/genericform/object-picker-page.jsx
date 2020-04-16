import { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import NavigationService from '@/nice-router/navigation.service'
import Listof from '@/listof/listof'
import { connect } from '@tarojs/redux'
import { useAsyncEffect } from '@/service/use.service'

// TODO 这页面应该是一个特殊的listof

function ObjectPickerPage(props) {
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
  } = props

  // q如果变化了，就发送一个后台请求
  const { q } = this.$router.params
  useAsyncEffect(() => {
    if (q) {
      const uri = decodeURIComponent(q)
      NavigationService.view(uri)
    }
  }, [q])

  const handleItemPress = (item) => {
    NavigationService.back({ data: item }, this)
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

ObjectPickerPage.options = {
  addGlobalClass: true,
}

export default connect(({ objectPicker }) => ({ ...objectPicker }))(ObjectPickerPage)

import { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import NavigationService from '@/nice-router/navigation.service'
import { AtSearchBar } from 'taro-ui'
import Listof from '@/listof/listof'
import { connect } from '@tarojs/redux'

// TODO 这页面应该是一个特殊的listof

function ObjectPickerPage(props) {

  const [keyword, setKeyword] = useState('')

  const { searchUrl, list, listMeta, displayMode, emptyMessage, style, dataContainer, articleList, articleListMeta } = props

  // TODO 未处理？
  // componentDidMount()
  // {
  //   const { linkToUrl } = this.$router.params
  //   if (linkToUrl) {
  //     NavigationService.ajax(linkToUrl)
  //   }
  // }

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

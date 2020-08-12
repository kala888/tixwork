import React from 'react'
import EleRichText from '@/components/elements/ele-rich-text'
import EleTabs from '@/components/elements/ele-tabs'
import { isNotEmpty } from '@/nice-router/nice-router-util'

import { useAjaxPullDown, usePageTitle } from '@/service/use.service'
import Config from '@/utils/config'
import EleFooterActionList from '@/components/elements/action-list/ele-footer-action-list'
import { View } from '@tarojs/components'
import Listof from './listof'
import SearchBar from './search-bar'
import './styles.scss'

function ListofPageBase(props) {
  const { pageTitle = Config.name } = props
  usePageTitle(pageTitle)
  useAjaxPullDown(props)

  const {
    tabs,
    list,
    listMeta,
    displayMode,
    emptyMessage,
    style,
    dataContainer,
    articleList,
    articleListMeta,
    actionList = [],
    content, // rich-text
    searchAction = {},
  } = props

  return (
    <View className='listof-page'>
      {isNotEmpty(searchAction) && <SearchBar {...searchAction} />}
      {isNotEmpty(content) && <EleRichText content={content} />}
      {isNotEmpty(tabs) && <EleTabs tabs={tabs} />}
      <Listof
        dataContainer={dataContainer}
        list={list || articleList}
        listMeta={listMeta || articleListMeta}
        displayMode={displayMode}
        emptyMessage={emptyMessage}
        isBigList
        height='100vh'
        style={style}
      />
      <EleFooterActionList list={actionList} />
    </View>
  )
}

export default ListofPageBase

import React from 'react'
import { isNotEmpty } from '@/nice-router/nice-router-util'

import { useAjaxPullDown, usePageTitle } from '@/service/use-service'
import Config from '@/utils/config'
import EleFooterActionList from '@/components/elements/action-list/ele-footer-action-list'
import { View } from '@tarojs/components'
import Listof from './listof'
import './styles.scss'
import FlexLineItem from './templates/flex-line-item'
import FlexHeader from './flex-header'

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
    header,
  } = props

  return (
    <View className='listof-page'>
      {isNotEmpty(header) && <FlexLineItem item={header} {...header} />}
      {isNotEmpty(searchAction) && <FlexHeader type='search' {...searchAction} />}
      {isNotEmpty(content) && <FlexHeader displayMode='rich-text' item={{ content }} />}
      {isNotEmpty(tabs) && <FlexHeader type='tabs' tabs={tabs} tabsType={tabsType} />}

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

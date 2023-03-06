import React from 'react'
import { isNotEmpty } from '@/nice-router/nice-router-util'

import { ActionLike, ActionListLike } from '@/nice-router/nice-router-types'
import Listof, { ListofProps } from './listof'
import FlexLineItem from './templates/flex-line-item'
import FlexHeader from './flex-header'
import EleActionList from '@/components/elements/ele-action-list'
import { StyleSheet, View } from 'react-native'
import { usePageTitle } from '@/service/use-service'

type listofPageBaseProps = {
  pageTitle?: string;
  content?: string;
  searchAction?: Record<string, any>;
  header?: Record<string, string>;
  renderHeader?: Function;
  renderFooter?: Function;
  tabs?: any[]
} & ActionListLike &
  ActionLike &
  // EleTabsProps &
  ListofProps;

function ListofPageBase(props: listofPageBaseProps) {

  // const { pageTitle = Config.name } = props
  // usePageTitle(pageTitle)
  // useAjaxPullDown(props)
  // useDidShow(() => NavigationService.ajax(props))

  usePageTitle(props)
  const {
    tabs,
    list,
    listMeta,
    displayMode,
    emptyMessage,
    dataContainer,
    actionList = [],
    content, // rich-text
    searchAction = {},
    header,
    renderHeader,
    renderFooter,
    onItemClick,
  } = props


  const theHeader = (
    <>
      {isNotEmpty(header) && <FlexLineItem item={header} {...header} />}
      {isNotEmpty(searchAction) && <FlexHeader {...searchAction} type='search' />}
      {isNotEmpty(content) && <FlexHeader content={content} type='rich-text' />}
      {isNotEmpty(tabs) && <FlexHeader type='tabs' tabs={tabs} />}
    </>
  )
  const theFooter = <EleActionList mode={['footer-bar', 'colorful']} items={actionList} />

  const rootClass = [styles.container]

  const theRenderHeader = () => renderHeader ? renderHeader() : theHeader

  // Footer 一般就是底部的一些操作，这里就不传到listof了，有点特殊
  // const theRenderFooter = () => renderFooter ? renderFooter() : theFooter
  return (
    <View style={rootClass}>
      <Listof
        dataContainer={dataContainer}
        list={list}
        listMeta={listMeta}
        displayMode={displayMode}
        emptyMessage={emptyMessage}
        longList
        onItemClick={onItemClick}
        renderHeader={theRenderHeader}
      />
      {renderFooter ? renderFooter() : theFooter}
    </View>
  )
}

export default ListofPageBase

const styles = StyleSheet.create({
  container: {},
  emptyMessage: {},
})

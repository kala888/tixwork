import React, { useState } from 'react'
import _ from 'lodash'
import Taro from '@tarojs/taro'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import EleActionList from '@/components/elements/action-list/ele-action-list'
import { getDeviceHeight } from '@/utils/index'
import { useDidShow, useReady } from '@tarojs/runtime'
import classNames from 'classnames'
import { useAjaxPullDown, usePageTitle } from '@/service/use-service'
import Config from '@/utils/config'
import { Block, View } from '@tarojs/components'
import NavigationService from '@/nice-router/navigation-service'

import Listof from './listof'
import './styles.scss'
import FlexLineItem from './templates/flex-line-item'
import FlexHeader from './flex-header'

function ListofPageBase(props) {
  const [height, setHeight] = useState()

  const { pageTitle = Config.name } = props
  usePageTitle(pageTitle)
  useAjaxPullDown(props)
  useDidShow(() => NavigationService.ajax(props))

  const initialHeight = () => {
    Taro.createSelectorQuery()
      .select('#listof-header')
      .fields({ size: true }, (res) => {
        const deviceHeight = getDeviceHeight()
        const headerHeight = _.isNumber(res.height) ? res.height : 0
        const footerHeight = isNotEmpty(props.actionList) || _.isFunction(renderFooter) ? 50 : 0
        const theHeight = deviceHeight - headerHeight - footerHeight
        console.log(
          'calc the height for listof without header and footer device',
          deviceHeight,
          'header',
          headerHeight,
          'footerHeight',
          footerHeight,
          'theHeight',
          theHeight
        )
        console.log('calc the height for listof without header and footer ', theHeight)
        setHeight(`${theHeight}px`)
      })
      .exec()
  }
  useReady(() => Taro.nextTick(() => setTimeout(initialHeight, 100)))

  const {
    tabs,
    tabsType,
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
    <Block>
      {isNotEmpty(header) && <FlexLineItem item={header} {...header} />}
      {isNotEmpty(searchAction) && <FlexHeader {...searchAction} type='search' />}
      {isNotEmpty(content) && <FlexHeader item={{ content }} displayMode='rich-text' />}
      {isNotEmpty(tabs) && <FlexHeader type='tabs' tabs={tabs} tabsType={tabsType} />}
    </Block>
  )
  const theFooter = <EleActionList mode={['footer-bar', 'colorful']} list={actionList} />

  const rootClass = classNames('listof-page', classNames)

  return (
    <View className={rootClass}>
      <View id='listof-header'>{renderHeader ? renderHeader() : theHeader}</View>
      <Listof
        dataContainer={dataContainer}
        list={list}
        listMeta={listMeta}
        displayMode={displayMode}
        emptyMessage={emptyMessage}
        height={height}
        longList
        onItemClick={onItemClick}
      />
      <View id='listof-footer'> {renderFooter ? renderFooter() : theFooter}</View>
    </View>
  )
}

export default ListofPageBase

import { useState } from '@tarojs/taro'
import { ScrollView, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import NavigationService from '@/nice-router/navigation.service'
import { getNumberColumns } from '@/listof/listof-helper'
import { enrichListOfEntity, toRpx } from '../utils'
import FlexLineItem from './templates/flex-line-item'

import './styles.scss'
import FooterTips from './footer-tips'

function Listof({
  list: listRefs,
  listMeta,
  displayMode,
  emptyMessage,
  isBigList,
  height,
  style = {},
  dataContainer,
  horizontal,
  bordered,
  containerClass,
  onItemPress = null,
  className,
}) {
  const [loading, setLoading] = useState(false)
  const loadMore = () => {
    console.log('on-end1')
    if (!loading) {
      if (listMeta.hasNextPage) {
        setLoading(true)
        NavigationService.dispatch('listof/fetchNext', {
          listMeta,
          onSuccess: () => {
            console.log('xxxx set loading to false')
            setLoading(false)
          },
        })
      }
    }
  }

  const list = enrichListOfEntity({ dataContainer, targetList: listRefs })

  const numColumns = getNumberColumns(displayMode)
  const itemWidth = numColumns ? 100 / numColumns - 1 : null

  const scrollViewStyle = height ? { height: toRpx(height) } : {}
  const scrollViewClass = classNames(className, {
    'scroll-view-horizontal': horizontal,
  })

  const listofContainerClass = classNames(
    {
      'listof-container': !horizontal,
      'multiple-items': itemWidth,
    },
    containerClass
  )

  const itemContainerClass = classNames('listof-container-item', { horizontal })

  const listofContainerItemContainerStyle = itemWidth ? { width: `${itemWidth}%` } : {}

  return list.length === 0 ? (
    <Text className='listof-empty-message'>{emptyMessage}</Text>
  ) : (
    <ScrollView
      scrollY={!horizontal}
      scrollX={horizontal}
      onScrollToLower={loadMore}
      className={scrollViewClass}
      style={{ ...scrollViewStyle }}
    >
      <View className={listofContainerClass} style={style}>
        {list.map((item, index) => {
          const { id } = item
          return (
            <View key={id} className={itemContainerClass} style={listofContainerItemContainerStyle}>
              <FlexLineItem
                my-class='listof-container-item-wrapper'
                index={index}
                item={item}
                onItemPress={onItemPress}
                displayMode={displayMode}
                bordered={bordered}
                horizontal={horizontal}
              />
            </View>
          )
        })}
      </View>
      <FooterTips
        isBigList={isBigList}
        listMeta={listMeta}
        loading={loading}
        listLength={list.length}
        loadMore={loadMore}
      />
    </ScrollView>
  )
}

Listof.options = {
  addGlobalClass: true,
}

Listof.defaultProps = {
  dataContainer: {},
  list: [],
  listMeta: {},
  displayMode: 'auto',
  emptyMessage: '',
  isBigList: false,
  height: null,
  numColumns: null,
  horizontal: false,
  bordered: true,
  className: null,
  onItemPress: null,
}

export default Listof

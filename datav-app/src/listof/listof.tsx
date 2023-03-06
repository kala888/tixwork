import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NavigationService from '@/nice-router/navigation-service'
import { LoadingType } from '@/nice-router/nice-router-util'
import FooterTips from '@/listof/footer-tips'
import { useLoading } from '@/service/use-service'
import ActionUtil from '@/nice-router/action-util'

import { enrichListOfEntity } from '../utils'

import FlexLineItem, { FlexLineItemProps } from './templates/flex-line-item'
import SimpleWrapper from '@/listof/simple-wrapper'
import colors from '@/utils/colors'
import { units } from '@/utils'


export type ListofProps = {
  list?: FlexLineItemProps[];
  items?: FlexLineItemProps[];
  emptyMessage?: string;
  dataContainer?: Record<string, any>;
  listMeta?: Record<string, any>;
  displayMode?: string;
  onItemClick?: Function;
  horizontal?: boolean;
  longList?: boolean;
  height?: number | string;
  mode?: 'horizontal' | 'vertical';
  style?: any;
  renderHeader?: () => void
  renderFooter?: () => void
};

function Listof(props: ListofProps) {
  const { loading, showLoading, hideLoading } = useLoading(false)
  const {
    list,
    items,
    emptyMessage,
    style,
    dataContainer,
    listMeta = {},
    displayMode,
    onItemClick,
    horizontal = false,
    longList = false,
    mode,
    renderHeader,
    renderFooter,
    ...rest
  } = props
  const theList: any[] = list || items || []


  const hasNextPage = ActionUtil.isActionLike(listMeta)
  //longList=无限循环list 展示footer
  let showFooter = longList
  //但是，如果没有下一页，且list比较小, 就不展示footer了
  if (!hasNextPage && theList.length < 15) {
    showFooter = false
  }
  // @ts-ignore
  const handleRefresh = () => NavigationService.view(props.linkToUrl)

  const loadMore = () => {
    if (!hasNextPage || loading) {
      return
    }

    showLoading()
    NavigationService.ajax(
      listMeta,
      {},
      {
        loading: LoadingType.BarLoading,
        arrayMerge: 'append',
        onSuccess: () => {
          hideLoading()
        },
      },
    )
  }

  // @ts-ignore
  const flexLineItems = enrichListOfEntity({ dataContainer, targetList: theList })

  // const itemWidth = ListofUtil.getItemWidth(displayMode)
  const rootClass = [
    styles.container,
    horizontal ? styles.horizontal : {},
    styles[mode],
    style,
  ]


  const renderItem = ({ item, index }) => (
    <FlexLineItem
      key={`${item.id}_${item.code}_${item.title}`}
      index={index}
      item={item}
      onItemClick={onItemClick}
      displayMode={displayMode}
      horizontal={horizontal}
    />
  )
  const keyExtractor = (item, idx) => `${item?.id}_${item?.title}_${idx}`

  const rc = (
    <RefreshControl
      refreshing={loading}
      onRefresh={handleRefresh}
      title='努力加载中...'
      progressBackgroundColor='#fff'
      colors={['dimgray', 'tomato', 'limegreen']}
    />
  )
  const listHeader = renderHeader && renderHeader()
  const listFooter = renderFooter ? renderFooter() : (
    showFooter && <FooterTips hasNextPage={hasNextPage} loading={loading} onLoadMore={loadMore} />
  )
  const emptyComponent = (
    <View style={styles.emptyMessage}>
      <Text style={styles.emptyMessageText}>{emptyMessage}</Text>
    </View>
  )

  const WrappedComponent = longList ? FlatList : SimpleWrapper

  console.log('listHeader', listHeader)
  return (
    <View style={rootClass}>
      <WrappedComponent
        refreshControl={rc}
        data={flexLineItems}
        initialNumToRender={6}
        onEndReachedThreshold={0.1}
        onEndReached={loadMore}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={listHeader}
        ListFooterComponent={listFooter}
        ListEmptyComponent={emptyComponent}
        {...rest}
      />
    </View>
  )
}

export default Listof


const styles = StyleSheet.create({
  container: {},
  emptyMessage: {
    height: 40 * units.vh,
    justifyContent: 'center',
    alignItems: 'center',

  },
  emptyMessageText: {
    color: colors.textColorLight,
    fontSize: 18,
  },
})

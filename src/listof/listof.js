import Taro from '@tarojs/taro'
import { ScrollView, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import NavigationService from '@/nice-router/navigation.service'
import { getNumberColumns } from '@/listof/listof-helper'
import { enrichListOfEntity, toRpx } from '../utils'
import LineItemWrapper from './templates/line-item-wrapper'

import './listof.scss'
import FooterTips from './footer-tips'

export default class Listof extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  static defaultProps = {
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
  }

  state = {
    loading: false,
  }

  startLoading = (cb) => {
    this.setState({ loading: true }, cb)
  }

  stopLoading = () => {
    this.setState({ loading: false })
  }

  loadMore = () => {
    console.log('on-end1')
    if (!this.state.loading) {
      const { listMeta } = this.props
      if (listMeta.hasNextPage) {
        this.startLoading(() =>
          NavigationService.dispatch('listof/fetchNext', {
            listMeta,
            onSuccess: () => {
              console.log('xxxx set loading to false')
              this.stopLoading()
            },
          })
        )
      }
    }
  }

  render() {
    const {
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
      onItemPress,
      className,
    } = this.props

    const list = enrichListOfEntity({ dataContainer, targetList: listRefs })
    console.log('listof', list)

    const numColumns = getNumberColumns(displayMode)
    const itemWidth = numColumns ? 100 / numColumns - 1 : null

    const scrollViewStyle = height ? { height: toRpx(height) } : {}
    const scrollViewClass = classNames(className, {
      'scroll-view-horizontal': horizontal,
    })

    const listofContainerClass = classNames(
      {
        'list-of-container': !horizontal,
        'multiple-items': itemWidth,
      },
      containerClass
    )

    const itemContainerClass = classNames('list-of-container-item', {
      horizontal: horizontal,
    })

    const listofContainerItemContainerStyle = itemWidth ? { width: `${itemWidth}%` } : {}

    return list.length === 0 ? (
      <Text className='listof-empty-message'>{emptyMessage}</Text>
    ) : (
      <ScrollView
        scrollY={!horizontal}
        scrollX={horizontal}
        onScrollToLower={this.loadMore}
        className={scrollViewClass}
        style={{ ...scrollViewStyle }}
      >
        <View className={listofContainerClass} style={style}>
          {list.map((item, index) => {
            const { id } = item
            return (
              <View key={id} className={itemContainerClass} style={listofContainerItemContainerStyle}>
                <LineItemWrapper
                  my-class='list-of-container-item-wrapper'
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
          loading={this.state.loading}
          listLength={list.length}
          loadMore={this.loadMore}
        />
      </ScrollView>
    )
  }
}

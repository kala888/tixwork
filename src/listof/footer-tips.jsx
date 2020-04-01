import Taro from '@tarojs/taro'
import { Block, View } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'

import './listof.scss'

export default class FooterTips extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  static defaultProps = {
    listMeta: null,
    loading: false,
    listLength: 0,
    isBigList: true,
  }

  handleLoadMore = (disabled) => {
    const { loadMore } = this.props
    if (!disabled && loadMore) {
      loadMore()
    }
  }

  render() {
    const { listMeta, loading, listLength, isBigList } = this.props

    let tips = ''
    let disabled = true

    if (loading) {
      tips = '正在加载中...'
    }

    if (!loading && listMeta) {
      if (listMeta.hasNextPage) {
        tips = '加载更多'
        disabled = false
      }
      if (!listMeta.hasNextPage && listLength > 10) {
        tips = '我们是有底线的'
      }
    }

    return (
      isBigList &&
      tips.length > 0 && (
        <View className='listof-footer-tips' onClick={() => this.handleLoadMore(disabled)}>
          {loading ? (
            <View className='listof-footer-tips-content'>
              <View className='listof-footer-tips-content-loading'>
                <AtActivityIndicator size={28} />
              </View>
              <View>{tips}</View>
            </View>
          ) : (
            <Block>
              <View className='listof-footer-tips-line' />
              <View className='listof-footer-tips-content'>{tips}</View>
              <View className='listof-footer-tips-line' />
            </Block>
          )}
        </View>
      )
    )
  }
}

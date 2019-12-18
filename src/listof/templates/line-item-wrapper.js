import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import classNames from 'classnames'
import m_ from '@/utils/mini-lodash'
import NavigationService from '@/nice-router/navigation.service'

import AutoTemplate from './auto-template'
import ArticleTemplate from './article-template'
import CardTemplate from './card-template'
import DocumentCardTemplate from './document-card-template'
import Waterfall from './waterfall-templage'
import ProductTemplate from './product-template'
import SmallUserCardTemplate from './small-user-card-templage'
import ImageOnBottomTemplate from './image-on-bottom'

import '../listof.scss'

export default class LineItemWrapper extends Taro.PureComponent {
  state = {
    loading: false,
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { item: current } = this.props
    const { item: next } = nextProps

    console.log('should item update?', current, next)

    if (this.state.loading !== nextState.loading) {
      return true
    }
    if (current === next) {
      console.log('item reRender false: current === next')
      return false
    }
    if (current.id !== next.id) {
      console.log('item reRender true: current.id !== next.id')
      return true
    }
    if (current && next && (current.hashCode || next.hashCode)) {
      console.log('item reRender  ?: next.hashCode !== current.hashCode', next.hashCode !== current.hashCode)
      return next.hashCode !== current.hashCode
    }
    return true
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
  }

  startLoading = () => {
    this.timer && clearTimeout(this.timer)
    this.setState(
      {
        loading: true,
      },
      () => {
        this.timer = setTimeout(() => this.stopLoading(), 3000)
      }
    )
  }
  stopLoading = () => {
    if (this.state.loading) {
      this.setState({ loading: false })
    }
  }

  handlePress = () => {
    const { onItemPress, item } = this.props
    if (onItemPress) {
      onItemPress(item)
      return
    }
    if (NavigationService.isActionLike(item)) {
      this.startLoading()
      // NavigationService.view('page://pages/test-page', item, { onSuccess: this.stopLoading })
      NavigationService.view(item, {}, { onSuccess: this.stopLoading })
    }
  }

  render() {
    const { item = {}, displayMode, bordered = true, shadow = true, horizontal } = this.props
    const { displayMode: itemDisplayMode } = item
    // const debouncePress = _.debounce(
    //   this.handlePress,
    //   this.props.delay || 300,
    // )
    const template = m_.toLower(itemDisplayMode || displayMode)
    console.log(`line-item show with "${template}, item is`, item)

    const wrapperClass = classNames('line-item-wrapper', {
      'no-border': !bordered,
      shadow,
    })
    const itemProps = { horizontal, item }
    return (
      <View onClick={this.handlePress} className={wrapperClass}>
        {this.state.loading && (
          <View className='item-loading'>
            <AtActivityIndicator size={50} mode='center' />
          </View>
        )}

        {template === 'auto' && <AutoTemplate {...itemProps} />}
        {template === 'only-title' && <AutoTemplate showImageCount={0} {...itemProps} />}
        {template === 'single-image' && <AutoTemplate showImageCount={1} {...itemProps} />}
        {template === 'double-image' && <AutoTemplate showImageCount={2} {...itemProps} />}
        {template === 'three-image' && <AutoTemplate showImageCount={3} {...itemProps} />}
        {template === 'image-on-bottom' && <ImageOnBottomTemplate {...itemProps} />}
        {template === 'waterfall' && <Waterfall {...itemProps} />}
        {template === 'product' && <ProductTemplate {...itemProps} />}
        {template === 'card' && <CardTemplate {...itemProps} />}
        {template === 'image-on-left' && <CardTemplate className='small' {...itemProps} />}
        {template === 'document-card' && <DocumentCardTemplate {...itemProps} />}
        {template === 'article' && <ArticleTemplate {...itemProps} />}
        {template === 'article-small' && <ArticleTemplate className='article-small' {...itemProps} />}
        {template === 'small-user-card' && <SmallUserCardTemplate {...itemProps} />}
      </View>
    )
  }
}

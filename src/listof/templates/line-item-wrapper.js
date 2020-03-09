import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import classNames from 'classnames'
import m_ from '@/utils/mini-lodash'
import NavigationService from '@/nice-router/navigation.service'
import UserTemplate from '@/listof/templates/user-template'

import AutoTemplate from './auto-template'
import CardTemplate from './card-template'
import DocumentCardTemplate from './document-card-template'
import Waterfall from './waterfall-templage'
import ProductTemplate from './product-template'
import ImageOnBottomTemplate from './image-on-bottom'

import '../listof.scss'

//不触发click事件的模板
const ITEM_SELF_PROCESS_WHITELIST = ['document']

export default class LineItemWrapper extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }
  static externalClasses = ['my-class']

  state = {
    loading: false,
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { item: current } = this.props
    const { item: next } = nextProps

    // console.log('should item update?', current, next)

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

  handlePress = (template) => {
    const { onItemPress, item } = this.props
    if (onItemPress) {
      onItemPress(item)
      return
    }
    if (ITEM_SELF_PROCESS_WHITELIST.indexOf(template) > -1) {
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
    // console.log(`line-item show with "${template}, item is`, item)

    const wrapperClass = classNames('line-item-wrapper', 'my-class', {
      'no-border': !bordered,
      shadow,
    })
    const itemProps = { horizontal, item }
    return (
      <View onClick={this.handlePress.bind(this, template)} className={wrapperClass}>
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
        {template === 'user' && <UserTemplate {...itemProps} />}
        {template === 'product' && <ProductTemplate {...itemProps} />}
        {template === 'card' && <CardTemplate {...itemProps} />}
        {template === 'document' && <DocumentCardTemplate {...itemProps} />}
      </View>
    )
  }
}

import Taro from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import isObject from 'lodash/isObject'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import { AtActionSheet, AtIcon } from 'taro-ui'
import './styles.scss'

export default class ItemLabel extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  static defaultProps = {
    rules: [],
    showRequired: true,
  }

  state = {
    visible: false,
  }

  showTips = () => {
    this.setState({
      visible: isNotEmpty(this.props.tips),
    })
  }

  hideTips = () => {
    this.setState({
      visible: false,
    })
  }

  render() {
    const { rules, showRequired, tips, layout } = this.props
    const isRequired = showRequired && rules.find((rule) => rule.required)
    const rootClass = classNames('item-label', { [`item-label-${layout}`]: true })

    const tipsTitle = isObject(tips) ? tips.title : ''
    const tipsContent = isObject(tips) ? tips.content : tips

    return (
      <View>
        <View className={rootClass}>
          <View onClick={this.showTips}>
            <Text className='item-label-title'>
              {isRequired && <Text className='item-label-title-required'>*</Text>}
              {this.props.children}
            </Text>

            {isNotEmpty(tips) && <AtIcon className='item-label-tips-icon' size={15} value='help' />}
          </View>

          <AtActionSheet onClose={this.hideTips} isOpened={this.state.visible}>
            <View className='item-label-tips-view'>
              <View className='item-label-tips-view-title'>{tipsTitle}</View>
              <View className='item-label-tips-view-content'>{tipsContent}</View>
            </View>
          </AtActionSheet>
        </View>
      </View>
    )
  }
}

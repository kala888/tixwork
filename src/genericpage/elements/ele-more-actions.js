import Taro from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import ServerImage from '@/components/image/server-image'
import NavigationService from '@/nice-router/navigation.service'

import './ele.scss'

import EleHelper from '../ele-helper'

export default class EleMoreActions extends Taro.PureComponent {
  static defaultProps = {
    text: '',
    imageUrl: '',
    icon: 'chevron-right',
    actionList: [],
    mode: 'auto',
    linkToUrl: '',
  }

  showSheet = (actionList = []) => {
    const itemList = actionList.map((it) => it.title)
    Taro.showActionSheet({
      itemList,
      success: ({ tapIndex }) => {
        NavigationService.view(actionList[tapIndex])
      },
    })
  }

  handleClick = () => {
    const { actionList, linkToUrl, mode } = this.props

    if (actionList.length === 0 && linkToUrl.length > 0) {
      NavigationService.view(linkToUrl)
      return
    }

    if (mode === 'actionSheet' || (mode === 'auto' && actionList.length > 1)) {
      this.showSheet(actionList)
      return
    }

    if (mode === 'link' || (mode === 'auto' && actionList.length === 1)) {
      NavigationService.view(actionList[0])
    }
  }

  render() {
    const { text, imageUrl, icon, className } = this.props
    const rootClass = EleHelper.classNames('ele-more-actions', className)

    return (
      <View onClick={this.handleClick} className={rootClass}>
        <Text className='ele-more-actions-txt'>{text}</Text>
        {imageUrl.length > 0 && (
          <ServerImage
            className='ele-more-actions-image'
            customStyle={{ width: '20px', height: '20px' }}
            src={imageUrl}
          />
        )}
        {icon.length > 0 && <AtIcon className='ele-more-actions-icon' value={icon} size={20} color='grey' />}
      </View>
    )
  }
}

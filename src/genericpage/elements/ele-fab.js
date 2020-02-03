import Taro from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import { AtFab, AtIcon } from 'taro-ui'
import ServerImage from '@/components/image/server-image'
import NavigationService from '@/nice-router/navigation.service'

import './ele.scss'
import EleHelper from '../ele-helper'

export default class EleFab extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }
  static defaultProps = {
    imageUrl: null,
    text: null,
    icon: null,
    customStyle: {},
    className: null,
    linkToUrl: null,
  }

  handleClick = () => {
    const { onClick, linkToUrl } = this.props
    if (onClick) {
      onClick()
      return
    }
    NavigationService.view(linkToUrl)
  }

  render() {
    const { imageUrl, text, icon, customStyle, className, size } = this.props
    const rootClass = EleHelper.classNames('ele-fab', className)
    return (
      <View className={rootClass}>
        <AtFab size={size} onClick={this.handleClick}>
          {icon ? (
            <AtIcon className='more-action-icon' value={icon} size={24} color='grey' />
          ) : (
            <View style={{ width: '25px', height: '25px' }}>
              {imageUrl && <ServerImage src={imageUrl} customStyle={{ width: '100%', height: '100%' }} />}
              {text && <Text style={{ width: '20px', height: '20px', ...customStyle }}>{text}</Text>}
            </View>
          )}
        </AtFab>
      </View>
    )
  }
}

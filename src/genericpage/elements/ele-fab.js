import Taro from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import { AtFab, AtIcon } from 'taro-ui'
import ServerImage from '@/components/image/server-image'

import './ele.scss'
import EleHelper from '../ele-helper'

export default class EleFab extends Taro.PureComponent {
  static defaultProps = {
    imageUrl: null,
    text: null,
    icon: null,
    customStyle: {},
    className: null,
  }

  render() {
    const { imageUrl, text, icon, customStyle, className } = this.props
    const rootClass = EleHelper.classNames('ele-fab', className)
    return (
      <View className={rootClass}>
        <AtFab>
          {icon ? (
            <AtIcon className='more-action-icon' value={icon} size={20} color='grey' />
          ) : (
            <View style={{ width: '25px', height: '25px' }}>
              {imageUrl && <ServerImage src={imageUrl} style={{ width: '100%', height: '100%' }} />}
              {text && <Text style={{ width: '20px', height: '20px', ...customStyle }}>{text}</Text>}
            </View>
          )}
        </AtFab>
      </View>
    )
  }
}

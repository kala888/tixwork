import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtIcon, AtTag } from 'taro-ui'
import { toRpx } from '@/utils/index'
import ServerImage from '@/components/image/server-image'

import './ele.scss'
import EleHelper from '../ele-helper'

export default class EleStoreLocation extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  static defaultProps = {
    address: '店铺在这里',
    longitude: null,
    latitude: null,
    iconColor: '#3399ff',
    imageUrl: '',
    name: '店铺名称',
    phoneNumber: '',
    summary: '',
    padding: 24,
    showBrief: true,
    showAddress: true,
    showPhoneNumber: true,
    tags: [],
    className: null,
  }

  makePhoneCall = () => {
    const { phoneNumber } = this.props
    if (phoneNumber) {
      Taro.makePhoneCall({
        phoneNumber,
      })
    }
  }

  showLocation = () => {
    const { address, longitude, latitude } = this.props

    if (longitude && latitude) {
      const location = {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        scale: 18,
        name: address,
      }
      Taro.openLocation(location)
    }
  }

  render() {
    const {
      address,
      iconColor,
      imageUrl,
      name,
      phoneNumber,
      summary,
      padding,
      showBrief,
      showAddress,
      showPhoneNumber,
      tags,
      className,
    } = this.props

    const rootClass = EleHelper.classNames('ele-store-location', className)

    return (
      <View className={rootClass} style={{ margin: `0 ${toRpx(padding)}` }}>
        {showBrief && (
          <View className='header'>
            <ServerImage my-class='header-left' src={imageUrl} />
            <View className='header-right'>
              <View className='header-right-name'>{name}</View>

              {summary.length > 0 && <View className='header-right-summary'>{summary}</View>}

              {tags.length > 0 && (
                <View className='header-right-tags'>
                  {tags.map((it) => (
                    <View key={it} className='header-right-tags-item'>
                      <AtTag size='small' key={it}>
                        {' '}
                        {it}{' '}
                      </AtTag>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        )}

        {showAddress && (
          <View className='info-item' onClick={this.showLocation}>
            <AtIcon value='map-pin' size={18} color={iconColor} />
            <View className='info-item-txt'>{address}</View>
          </View>
        )}

        {showPhoneNumber && (
          <View className='info-item' onClick={this.makePhoneCall}>
            <AtIcon value='phone' size={18} color={iconColor} />
            <View className='info-item-txt'>{phoneNumber}</View>
          </View>
        )}
      </View>
    )
  }
}

import Taro from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import EleBreakLine from '@/genericpage/elements/ele-break-line'
import ServerImage from '@/components/image/server-image'
import './ele.scss'

export default class EleStoreLocationBig extends Taro.PureComponent {
  static propTypes = {
    imageUrl: PropTypes.string.isRequired,
    logo: PropTypes.string,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string,
  }

  handleMakeCall = () => {
    const { phoneNumber } = this.props
    if (phoneNumber) {
      Taro.makePhoneCall({ phoneNumber })
    }
  }

  render() {
    const { imageUrl, logo, name, address } = this.props

    return (
      <View className='store-location-big'>
        <ServerImage my-class='store-location-big-face-image' src={imageUrl} />

        <View className='store-location-big-title'>
          <View className='store-location-big-title-logo'>
            <ServerImage customStyle={{ width: '100%', height: '100%' }} src={logo} />
          </View>
          <View>{name}</View>
        </View>
        <EleBreakLine />
        <View className='store-location-big-content' onClick={this.handleMakeCall}>
          <AtIcon value='map-pin' size={18} color='orangered' />
          <View className='store-location-big-content-address'>{address}</View>
          <View className='store-location-big-content-icon'>
            <AtIcon value='phone' size={18} />
          </View>
        </View>
      </View>
    )
  }
}

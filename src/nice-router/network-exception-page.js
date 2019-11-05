import Taro from '@tarojs/taro'
import { Button, Image, View } from '@tarojs/components'
import NavigationService from './navigation.service'

import networkImage from './network.png'

export default class NetworkExceptionPage extends Taro.PureComponent {
  onRefresh = () => {
    NavigationService.dispatch('niceRouter/retry')
  }

  render() {
    return (
      <View
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}
      >
        <Image
          style={{
            width: '200px',
            height: '200px',
          }}
          src={networkImage}
        />
        <View style={{ color: '#999', margin: '20px 0px' }}>网络状态待提升，点击重试</View>
        <Button style={{ color: '#999' }} onClick={this.onRefresh}>
          查看解决方案
        </Button>
      </View>
    )
  }
}

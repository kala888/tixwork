import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'


import './home.scss'

@connect(({ home }) => ({ ...home }))
export default class HomePage extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }


  render() {

    return (
      <View className='home-page'>
      </View>
    )
  }
}

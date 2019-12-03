import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import m_ from '@/utils/mini-lodash'

class StoreOrderTemplate extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  render() {
    const { item = {} } = this.props
    const { order, name, score, recommendStore, newStore, avg, percent } = item
    const colStyle = {
      display: 'flex',
      flex: 2,
      alignItem: 'center',
      justifyContent: 'center',
    }
    const orderStyle = m_.isNumber(order)
      ? {
          background: order <= 3 ? 'red' : '#ddd',
          borderRadius: '10px',
          minWidth: '25px',
          textAlign: 'center',
          color: '#fff',
          fontWeight: '500',
        }
      : {}

    return (
      <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <View className='note' style={{ ...colStyle, flex: 1 }}>
          <View style={orderStyle}>{order}</View>
        </View>
        <View className='note' style={colStyle}>
          {name}
        </View>
        <View className='note' style={colStyle}>
          {score}
        </View>
        <View className='note' style={colStyle}>
          {recommendStore}
        </View>
        <View className='note' style={colStyle}>
          {newStore}
        </View>
        <View className='note' style={colStyle}>
          {avg}
        </View>
        <View className='note' style={colStyle}>
          {percent}
        </View>
      </View>
    )
  }
}

export default StoreOrderTemplate

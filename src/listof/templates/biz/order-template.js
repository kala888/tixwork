import Taro from '@tarojs/taro'
import { formatMoney } from '@/utils/index'
import EleActionList from '@/genericpage/elements/ele-action-list'
import { View } from '@tarojs/components'
import ServerImage from '@/components/image/server-image'

import '../../listof.scss'

export default class OrderTemplate extends Taro.PureComponent {
  render() {
    const { item = {} } = this.props
    const {
      status = {},
      title,
      lineItemList = [],
      finalAmount,
      actionList = [{ title: '确认' }, { title: '等待确认' }],
    } = item
    return (
      <View className='order'>
        <View className='order-title'>
          <View className='order-title-project'>{title}</View>
          <View className='order-title-status'> {status.name}</View>
        </View>
        <View className='order-content'>
          {lineItemList.map((it) => (
            <View key={it.id} className='order-content-item'>
              <View className='order-content-item-img'>
                <ServerImage src={it.imageUrl} />
              </View>
              <View className='order-content-item-content'>
                <View className='order-content-item-content-price'>￥{formatMoney(it.amount)}</View>
                <View className='order-content-item-content-title'>{it.name}</View>
                <View className='order-content-item-content-brief'>{it.brief}</View>
                <View className='order-content-item-content-store'>{it.store}</View>
              </View>
            </View>
          ))}
        </View>
        <View className='order-footer'>
          <View className='order-footer-title'> 共计：</View>
          <View className='order-footer-price'>￥{formatMoney(finalAmount)}</View>
        </View>
        {actionList.length > 0 && (
          <View className='order-actions'>
            <EleActionList className='right' list={actionList} />
          </View>
        )}
      </View>
    )
  }
}

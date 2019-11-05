import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import EleListof from '@/genericpage/elements/ele-listof'

export default class HelloDaaSPage extends Taro.PureComponent {
  render() {
    const shopList = {
      dataContainer: {
        shop1: {
          title: '百安居天府新区店',
          brief: '【装修旗舰店】免费测量，预定送智能家居',
          displayMode: 'auto',
          imageUrl: 'http://www.eastphoto.cn/indexImages/ep-012136603.jpg',
        },
        shop2: {
          title: '湛蓝科技',
          brief: '【空气治理专家】持牌机构，空气治理去甲醛',
          displayMode: 'image-on-left',
          imageUrl:
            'https://m.360buyimg.com/babel/s370x259_jfs/t1/20729/24/4177/80676/5c2f1aeaE062589aa/ee7cc78db75d62ed.jpg!q70.dpg',
        },
      },
      list: [{ id: 'shop1' }, { id: 'shop2' }],
    }
    return (
      <View>
        <EleListof {...shopList} />
      </View>
    )
  }
}

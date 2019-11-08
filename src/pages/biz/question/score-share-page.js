import Taro from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import EleButton from '@/genericpage/elements/ele-button'

import './question-detail.scss'


const defaultAvatar = 'http://www.eastphoto.cn/indexImages/ep-012136603.jpg'
const mockList = [
  { id: 1, order: 1, imageUrl: defaultAvatar, name: 'akala', score: 8000 },
  { id: 2, order: 2, imageUrl: defaultAvatar, name: '李亚青', score: 788 },
  { id: 11, order: 11, imageUrl: defaultAvatar, name: '李亚蓝', score: 16 },
  { id: 12, order: 12, imageUrl: defaultAvatar, name: '利亚黑', score: 15 },
  { id: 13, order: 13, imageUrl: defaultAvatar, name: '李亚紫', score: 10 },
]

export default class ScoreSharePage extends Taro.PureComponent {

  render() {
    const {
      imageUrl, name = 'kala88',
      brief = 'wangzhe',
      score = 20,
      list = mockList,
    } = this.props

    return (
      <View className='question-page'>
        <View className='score-detail'>
          <View className='score-detail-top'>
            <View className='score-detail-top-avatar'>
              <Image src={imageUrl || defaultAvatar} />
            </View>

            <View className='score-detail-top-content'>
              <View className='score-detail-top-content-name'>{name}</View>
              <View className='score-detail-top-content-brief'>{brief}</View>
            </View>
          </View>
          <View className='score-detail-body'>
            <View className='score-detail-body-title'>
              挑战排行榜
            </View>
            {
              score && (<View className='score-detail-body-score'>
                <View className='score-detail-body-score-txt'>
                  本次获得分数：{score}
                </View>
              </View>)
            }
            <View className='score-detail-body-list'>
              {
                list.map(it => (
                  <View className='score-detail-body-list-item' key={it.id}>
                    <View className='score-detail-body-list-item-order'>{it.order}</View>
                    <View className='score-detail-body-list-item-avatar'>
                      <Image src={it.imageUrl || defaultAvatar} />
                    </View>
                    <View className='score-detail-body-list-item-name'>{it.name}</View>
                    <View className='score-detail-body-list-item-score'>{it.score}分</View>
                  </View>),
                )
              }
            </View>
          </View>

          <View className='score-detail-footer'>
            <View className='score-detail-footer-item'>
              <EleButton type='share' uiType='secondary' className='share-button'>分享</EleButton>
            </View>
            <View className='score-detail-footer-item'>
              <EleButton uiType='secondary' className='share-button'>分享到朋友圈</EleButton>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

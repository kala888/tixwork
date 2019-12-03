import Taro from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import EleButton from '@/genericpage/elements/ele-button'
import { connect } from '@tarojs/redux'
import NavigationService from '@/nice-router/navigation.service'
import Config from '@/utils/config'
import NavigationBoxBar from '@/components/navigation-box-bar'
import ShareCanvas from '@/components/biz/share-canvas'

import './me.scss'
import buildingIcon from '../../assets/icon/icon_loupan@2x.png'
import commerceIcon from '../../assets/icon/icon_liansuo@2x.png'

const defaultActionList = [
  {
    code: 'continue-answer',
    icon: buildingIcon,
    title: '继续答题',
    linkToUrl: 'page:///pages/biz/exam/question-detail-page',
  },
  {
    code: 'view-fault-answer-list',
    icon: commerceIcon,
    title: '我的错题',
    linkToUrl: Config.api.ViewFaultAnswer,
  },
]

@connect(({ me }) => ({ ...me }))
export default class MePage extends Taro.PureComponent {
  componentDidMount() {
    NavigationService.view(Config.api.ViewScore, { id: '+' })
  }

  onPullDownRefresh = () => {
    NavigationService.view(Config.api.ViewScore, { id: '+' })
  }

  handleAuth = () => {
    NavigationService.navigate('/pages/login/login-page')
  }

  render() {
    const {
      question = '什么是区块连？',
      imageUrl,
      name = '',
      brief = '',
      examScore = null,
      list = [],
      worldRanking = 2254,
      totalScore = 8000,
    } = this.props

    return (
      <View className='me-page'>
        <View className='me-page-header'>
          <View className='me-page-header-avatar' onClick={this.handleAuth}>
            <Image src={imageUrl} />
          </View>

          <View className='me-page-header-content'>
            <View className='me-page-header-content-name'>{name}</View>
            <View className='me-page-header-content-brief'>{brief}</View>
          </View>
        </View>

        <NavigationBoxBar list={defaultActionList} customStyle={{ color: '#fff' }} />

        <View className='me-page-body'>
          <View className='me-page-body-title'>挑战排行榜</View>
          {examScore && (
            <View className='me-page-body-score'>
              <View className='me-page-body-score-txt'>本次获得分数：{examScore}</View>
            </View>
          )}
          <View className='me-page-body-list'>
            {list.map((it) => (
              <View className='me-page-body-list-item' key={it.id}>
                <View className='me-page-body-list-item-order'>{it.worldRanking}</View>
                <View className='me-page-body-list-item-avatar'>
                  <Image src={it.imageUrl} />
                </View>
                <View className='me-page-body-list-item-name'>{it.name}</View>
                <View className='me-page-body-list-item-score'>{it.totalScore}分</View>
              </View>
            ))}
          </View>
        </View>

        <View className='me-page-share'>
          <EleButton btnType='share' uiType='secondary' className='share-button'>
            分享
          </EleButton>
          <ShareCanvas question={question} name={name} worldRanking={worldRanking} totalScore={totalScore} />
        </View>
      </View>
    )
  }
}

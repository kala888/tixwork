import Taro from '@tarojs/taro'
import { Block, View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import StorageTools from '@/nice-router/storage-tools'
import Listof from '@/listof/listof'
import { AtIcon } from 'taro-ui'
import EleCarousel from '@/genericpage/elements/ele-carousel'
import NavigationService from '@/nice-router/navigation.service'
import EleButton from '@/genericpage/elements/ele-button'

import './home.scss'

const defaultImageUrl = 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/jiyibao/slide.jpg'

@connect(({ home }) => ({ ...home }))
class HomePage extends Taro.PureComponent {
  state = {
    userType: '',
  }

  componentDidMount() {
    const userType = StorageTools.get('userType', '')
    this.setState({
      userType,
    })
  }

  handleNewOrg = () => {
    // NavigationService.navigate('/pages/biz/new-org-page')
    NavigationService.navigate('/pages/biz/org/new-org-page')
  }

  handleSwitchUserType = () => {
    const { userType } = this.state
    const newType = userType === 'teacher' ? 'guardian' : 'teacher'
    const newTypeName = newType === 'teacher' ? '老师' : '监护人'
    Taro.showModal({
      title: '提示',
      content: `是否切换身份到（ ${newTypeName} ）`,
      success: (res) => {
        console.log('xxxxx', JSON.stringify(res))
        if (res.confirm) {
          StorageTools.set('userType', newType)
          // NavigationService.ajax(Config.api.FooterHome)
          this.setState({ userType: newType })
        }
      },
    })
  }

  render() {
    const { userType } = this.state
    const shareBtn = userType === 'teacher' ? '分享给其他老师' : '分享给老师'
    const switchBtn = userType === 'teacher' ? '我是家长' : '我是老师'
    const emptyMessage = userType === 'teacher' ? '创建好班级以后就能发布调查问卷' : '还有没做问卷，赶快分享给老师吧'

    return (
      <View className='home-page'>
        <EleCarousel items={slideList} />

        <View className='home-page-share'>
          <EleButton title={shareBtn} />
        </View>

        <View className='home-page-switch' onClick={this.handleSwitchUserType}>
          {switchBtn}
        </View>

        {userType === 'teacher' && (
          <Block>
            <View className='org-group-section'>
              <View className='org-group-section-title'>我的班级</View>
              <View className='org-group-section-add' onClick={this.handleNewOrg}>
                <AtIcon value='add-circle' />
              </View>
            </View>
            <Listof list={mockGroupList} displayMode='org-group' />

            <View className='org-group-section'>
              <View className='org-group-section-title'>近期调查结果</View>
            </View>
            <Listof list={questionnaireList} displayMode='questionnaire' emptyMessage={emptyMessage} />
          </Block>
        )}

        {userType !== 'teacher' && (
          <Listof list={questionnaireAnswer} displayMode='questionnaire-answer' emptyMessage={emptyMessage} />
        )}
      </View>
    )
  }
}

export default HomePage

const mockGroupList = [
  {
    org: '益州小学',
    group: '二年级五班',
    totalQuestionnaire: 100,
    totalReply: 80,
    linkToUrl: 'page:///pages/biz/org/org-detail-page',
  },
  {
    org: '实验小学',
    group: '二年级3班',
    totalQuestionnaire: 30,
    totalReply: 1200,
    linkToUrl: 'page:///pages/biz/org/org-detail-page',
  },
]

const questionnaireList = [
  { org: '益州小学', group: '8年级五班', totalUser: 20, completed: 18, risk: 0 },
  { org: '实验小学', group: '二年级3班', totalUser: 80, completed: 20, risk: 0 },
  { org: '中心小学', group: '二年级113班', totalUser: 77, completed: 98, risk: 5 },
]

const slideList = [
  { id: 111, imageUrl: defaultImageUrl },
  { id: 222, imageUrl: defaultImageUrl },
]

const questionnaireAnswer = [
  {
    id: '1',
    createTime: '2020-02-06',
    name: '张三丰',
    infoList: [
      { title: '是否发烧', value: '没' },
      { title: '是否吃多了', value: '没' },
      { title: '体温', value: '37.5' },
    ],
  },
  {
    id: '2',
    createTime: '2020-02-05',
    name: '张三丰',
    infoList: [
      { title: '是否发烧', value: '没' },
      { title: '是否吃多了', value: '没' },
      { title: '体温', value: '37.2' },
    ],
  },
]

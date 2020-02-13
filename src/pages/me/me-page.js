import Taro from '@tarojs/taro'
import { Block, View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Listof from '@/listof/listof'
import { AtIcon } from 'taro-ui'
import EleCarousel from '@/genericpage/elements/ele-carousel'
import NavigationService from '@/nice-router/navigation.service'
import EleButton from '@/genericpage/elements/ele-button'
import StorageTools from '@/nice-router/storage-tools'
import Config from '@/utils/config'
import { LoadingType } from '@/nice-router/nice-router-util'
import './me.scss'

// const defaultImageUrl = 'https://doublechain.oss-cn-hangzhou.aliyuncs.com/jiyibao/slide.jpg'

@connect(({ me }) => ({ ...me }))
class MePage extends Taro.PureComponent {
  componentDidMount() {
    const userType = StorageTools.get('user-type')
    console.log('componentDidMount，load data')
    NavigationService.dispatch('me/switchUserType', { userType })
  }

  onPullDownRefresh = () => {
    const { userType } = this.props
    let url = Config.api.GuardianHome
    if (userType === 'teacher') {
      url = Config.api.TeacherHome
    }
    NavigationService.ajax(url, {}, { onSuccess: () => Taro.stopPullDownRefresh(), loading: LoadingType.modal })
  }

  onShareAppMessage(res) {
    console.log(res)
    return {
      title: '疾疫报，帮助您收集健康信息',
      path: '/pages/me/me-page',
    }
  }

  handleNewOrg = () => {
    NavigationService.navigate('/pages/biz/org/new-org-page')
  }

  handleSwitchUserType = () => {
    const { userType } = this.props
    const newType = userType === 'teacher' ? 'guardian' : 'teacher'
    const newTypeName = newType === 'teacher' ? '老师' : '家长'

    Taro.showModal({
      title: '提示',
      content: `是否切换身份到（ ${newTypeName} ）`,
      success: (res) => {
        console.log('xxxxx', JSON.stringify(res))
        if (res.confirm) {
          NavigationService.dispatch('me/switchUserType', { userType: newType })
        }
      },
    })
  }

  handleViewMore = (action) => {
    NavigationService.view(action)
  }

  render() {
    const { userType } = this.props
    console.log('render..', userType)
    const shareBtn = userType === 'teacher' ? '分享给其他老师' : '分享给老师'
    const switchBtn = userType === 'teacher' ? '我是家长' : '我是老师'
    const emptyMessage = userType === 'teacher' ? '创建好班级以后就能发布调查问卷' : '还有没做问卷，赶快分享给老师吧'

    const { slideList = [], actions = {}, surveyList = [], classList = [], surveyAnswerList = [] } = this.props
    const { viewMoreClass } = actions

    return (
      <View className='home-page'>
        {slideList.length > 0 && <EleCarousel items={slideList} />}

        {/*<AtButton onClick={() => NavigationService.view('customerStudentViewSurvey/CDHS000001/')}>测试</AtButton>*/}
        <View className='home-page-share'>
          <EleButton btnType='share' title={shareBtn} />
        </View>

        <View className='home-page-switch' onClick={this.handleSwitchUserType}>
          {switchBtn}
        </View>

        {userType === 'teacher' && (
          <Block>
            <View className='org-group-section'>
              <View className='org-group-section-title'>
                我的班级
                {viewMoreClass && <View onClick={this.handleViewMore.bind(this, viewMoreClass)}>（查看更多）</View>}
              </View>
              <View className='org-group-section-add' onClick={this.handleNewOrg}>
                <AtIcon value='add-circle' />
              </View>
            </View>
            <Listof list={classList} displayMode='org-group' emptyMessage='需要收集问卷，要先创建班级哦' />

            <View className='org-group-section'>
              <View className='org-group-section-title'>近期调查结果</View>
            </View>
            <Listof list={surveyList} displayMode='class_daily_health_survey' emptyMessage={emptyMessage} />
          </Block>
        )}

        {userType !== 'teacher' && (
          <Listof list={surveyAnswerList} displayMode='survey-answer' emptyMessage={emptyMessage} />
        )}
      </View>
    )
  }
}

export default MePage

import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import Listof from '@/listof/listof'
import EleButton from '@/genericpage/elements/ele-button'

import NavigationService from '@/nice-router/navigation.service'
import './styles.scss'

export default class OrgDetailPage extends Taro.PureComponent {
  componentDidMount() {
    Taro.setNavigationBarTitle({ title: '班级信息' })
  }

  handleCreateNew = () => {
    NavigationService.navigate('/pages/biz/questionnaire/questionnaire-page', { newQuestion: true })
  }

  render() {
    const { org = '中心小学', group = '三年级二班' } = this.props
    return (
      <View className='org-detail-page'>
        <View className='org-detail-page-title'>
          {org}-{group}
        </View>
        <Listof list={questionnaireList} displayMode='questionnaire' />
        <View className='footer-button'>
          <View className='footer-button-btn'>
            <EleButton title='创建新的问卷' onClick={this.handleCreateNew} />
          </View>
        </View>
      </View>
    )
  }
}

const questionnaireList = [
  {
    org: '益州小学',
    group: '8年级五班',
    totalUser: 20,
    completed: 18,
    risk: 0,
    linkToUrl: 'page:///pages/biz/questionnaire/questionnaire-detail-page',
  },
  {
    org: '实验小学',
    group: '二年级3班',
    totalUser: 80,
    completed: 20,
    risk: 0,
    linkToUrl: 'page:///pages/biz/questionnaire/questionnaire-detail-page',
  },
  {
    org: '中心小学',
    group: '二年级113班',
    totalUser: 77,
    completed: 98,
    risk: 5,
    linkToUrl: 'page:///pages/biz/questionnaire/questionnaire-detail-page',
  },
]

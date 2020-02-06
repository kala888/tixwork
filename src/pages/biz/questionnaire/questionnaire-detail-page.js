import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import EleButton from '@/genericpage/elements/ele-button'
import Listof from '@/listof/listof'
import classNames from 'classnames'
import './styles.scss'

class QuestionnaireDetailPage extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  render() {
    const { org = '中心小学', group = '三年级二班', totalUser = 1, completed = 1, risk = 10 } = this.props

    const riskCls = classNames('questionnaire-body-item', { grey: true, risk: risk > 0 })
    return (
      <View className='questionnaire-detail-page'>
        <View className='detail-header'>
          <View className='detail-header-org'>
            {org}-{group}
          </View>
          <View className='detail-header-time'>2020-02-06</View>

          <View className='questionnaire-body'>
            <View className='questionnaire-body-item,grey'>
              <View className='questionnaire-body-item-icon'>
                <AtIcon value='user' />
              </View>
              <View className='questionnaire-body-item-txt'>共{totalUser}人</View>
            </View>
            <View className='questionnaire-body-item,grey'>
              <View className='questionnaire-body-item-icon'>
                <AtIcon value='check' />
              </View>
              <View className='questionnaire-body-item-txt'>{completed}人完成</View>
            </View>
            <View className={riskCls}>
              <View className='questionnaire-body-item-icon'>
                <AtIcon value='bell' />
              </View>
              <View className='questionnaire-body-item-txt'>{risk}人风险</View>
            </View>
          </View>
        </View>
        <Listof list={questionnaireAnswer} displayMode='questionnaire-answer' />

        <View className='detail-footer'>
          <View className='detail-footer-btn'>
            <EleButton title='导出Excel' />
          </View>
          <View className='detail-footer-btn'>
            <EleButton title='继续分享调查' />
          </View>
        </View>
      </View>
    )
  }
}

export default QuestionnaireDetailPage

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

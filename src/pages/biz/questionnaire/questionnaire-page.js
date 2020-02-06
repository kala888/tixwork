import Taro from '@tarojs/taro'
import { Form, View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import EleButton from '@/genericpage/elements/ele-button'
import NavigationService from '@/nice-router/navigation.service'
import Config from '@/utils/config'
import { formatTime } from '@/utils/index'

import EleInput from '@/genericpage/form/ele-input'
import './styles.scss'
import ChooseQuestion from '../org/choose-question'

const KEY = 'new-questionnaire'

@connect(({ home }) => ({ ...home }))
class QuestionnairePage extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  componentDidMount() {
    NavigationService.ajax(Config.api.QuestionList)
  }

  handleSubmit = () => {
    const { newQuestion = false } = this.props

    if (newQuestion) {
      NavigationService.view(Config.api.NewQuestionnaire)
      return
    }

    const payload = {
      formKey: KEY,
      submit: (formData) => {
        console.log('submit-form', formData)
        NavigationService.post(Config.api.NewOrg, formData, {
          asForm: true,
          navigationOptions: { method: 'redirectTo' },
        })
      },
    }

    console.log('form submit from recommend-project page', payload, this.props)
    Taro.eventCenter.trigger('form-submit', payload)
  }

  render() {
    const {
      newQuestion = false,
      org = '中心试验小学',
      group = '三年级2班',
      createDate = '2020-02-05',
      questionList = defaultQuestionList,
    } = this.props

    const questionDate = newQuestion ? formatTime(Date.now()) : createDate
    const submitBtn = newQuestion ? '确认创建问卷' : '确认提交'

    return (
      <Form onSubmit={this.handleSubmit}>
        <View className='questionnaire-page'>
          <View class='question-title'>健康状况调查表</View>
          <View class='question-org'>
            {org}-{group}
          </View>

          <View class='question-time'>问卷时间： {questionDate}</View>

          {!newQuestion && (
            <View class='question-user'>
              <EleInput title='姓名' placeholder='学生或调查对象姓名' />
            </View>
          )}

          <View class='question-list'>
            {questionList.map((it, idx) => {
              const { id, type, name, title, placeholder, candidateValues } = it
              const labelTxt = `${idx + 1}. ${title}`
              return (
                <View key={id} className='question-list-item'>
                  {type === 'input' ? (
                    <EleInput
                      name={name}
                      title={labelTxt}
                      placeholder={placeholder}
                      formKey={KEY}
                      className='newquestion-input'
                    />
                  ) : (
                    <ChooseQuestion name={name} title={labelTxt} options={candidateValues} />
                  )}
                </View>
              )
            })}
          </View>

          <View className='question-footer'>
            <View className='question-footer-btn'>
              <EleButton title={submitBtn} className='submit-button' />
            </View>
          </View>
        </View>
      </Form>
    )
  }
}

export default QuestionnairePage

const defaultQuestionList = [
  {
    id: 1,
    type: 'choose',
    title: '是否发烧',
    brief: '有情况汇报',
    candidateValues: [
      { name: '是', id: 'yes' },
      { name: '否', id: 'no' },
      { name: '不知道', id: 'unknown' },
    ],
  },

  {
    id: 2,
    type: 'choose',
    title: '是否接触过武汉人',
    brief: '否',
    candidateValues: [
      { name: '是', id: 'yes' },
      { name: '否', id: 'no' },
    ],
  },
  { id: 3, type: 'input', title: '体温度数是多少', brief: '有情况汇报', placeholder: '吃饭了么？' },
]

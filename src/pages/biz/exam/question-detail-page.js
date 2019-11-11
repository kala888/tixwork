import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { AtIcon } from 'taro-ui'
import m_ from '@/utils/mini-lodash'
import NavigationService from '@/nice-router/navigation.service'
import EleFooterTabs from '@/genericpage/elements/ele-footer-tabs'
import Config from '@/utils/config'
import './question-detail.scss'

const defaultQuestionList = [
  {
    id: 1,
    title: '什么是区块链?',
    correctAnswerId: 'A333',
    choices: [
      { id: 'A111', displayId: 'A', text: '由攀成钢专门打造，千年寒铁构成' },
      { id: 'A222', displayId: 'B', text: '别说了，就是比特币' },
      {
        id: 'A333',
        displayId: 'C',
        text: '区块链是分布式数据存储、点对点传输、共识机制、加密算法等计算机技术的新型应用模式',
      },
      { id: 'A444', displayId: 'D', text: '骗人的，跟0f0一样要交押金的' },
    ],
  },
]

const DISPLAY_ID = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'n']

export default class QuestionDetailPage extends Taro.PureComponent {
  state = {
    selected: null,
    current: 0,
    theLastAnswer: 0,
    questionList: defaultQuestionList,
    examId: '+',
  }

  componentDidMount() {
    NavigationService.ajax(
      Config.api.StartExam,
      {},
      {
        onSuccess: (resp) => {
          const { questions = [], examId } = resp
          this.setState({
            current: 0,
            theLastAnswer: 0,
            selected: null,
            questionList: questions,
            examId: examId,
          })
        },
      }
    )
  }

  handleChoose = (item) => {
    if (this.state.selected) {
      return
    }
    const selected = item.id
    const { questionList, current } = this.state
    const question = questionList[current]
    this.setState(
      (pre) => ({
        selected,
        theLastAnswer: pre.theLastAnswer + 1,
      }),
      () => {
        NavigationService.ajax(Config.api.AnswerQuestion, {
          questionId: question.id,
          choicesId: selected,
        })
      }
    )
  }

  changeQuestion = (item) => {
    const { code } = item
    if (code === 'go-next') {
      this.setState((pre) => ({
        current: pre.current + 1,
        selected: null,
        theLastAnswer: pre.current,
      }))
      return
    }
    if (code === 'go-pre') {
      this.setState((pre) => ({
        current: pre.current - 1,
        selected: null,
      }))
      return
    }

    NavigationService.view(
      Config.api.ViewScore,
      { id: this.state.examId },
      {
        navigationOptions: { method: 'redirectTo' },
      }
    )
  }

  render() {
    const { questionList = [], selected, current, theLastAnswer } = this.state
    const { title, choices = [], correctAnswerId, desc } = questionList[current] || {}
    const answered = !m_.isEmpty(selected)
    const correct = selected === correctAnswerId
    const isTheLastOne = current === questionList.length - 1
    const footerTabs = []
    // if (this.state.current !== 0 && !isTheLastOne) {
    //   footerTabs.push({ code: 'go-pre', title: '上一题', iconType: 'prev' })
    // }

    if (!isTheLastOne) {
      footerTabs.push({ code: 'go-next', title: '下一题', iconType: 'next' })
    } else {
      footerTabs.push({ code: 'view-score', title: '查看分享成绩', iconType: 'share' })
    }

    return (
      <View className='question-page'>
        <View className='question'>
          <View className='question-title'>
            <View className='question-title-number'>
              ({current + 1}/{questionList.length}) {title}
            </View>
          </View>

          <View className='question-choices'>
            {choices.map((it, idx) => {
              const cls = classNames('question-choices-item', {
                hidden: answered && (it.id !== selected && it.id !== correctAnswerId),
                correct: answered && it.id === correctAnswerId,
                notCorrect: answered && it.id === selected && !correct,
              })

              return (
                <View key={it.id} className={cls} onClick={this.handleChoose.bind(this, it)}>
                  {answered && !correct && it.id === selected && <AtIcon size='small' value='close' />}
                  <View className='question-choices-item-id'>{DISPLAY_ID[idx]}.</View>
                  <View className='question-choices-item-txt'>{it.text}</View>
                  {answered && it.id === correctAnswerId && <AtIcon value='check-circle' />}
                </View>
              )
            })}
          </View>

          {(answered || current < theLastAnswer) && (
            <View>
              <View>{desc}</View>
              <EleFooterTabs onClick={this.changeQuestion} tabs={footerTabs} />
            </View>
          )}
        </View>
      </View>
    )
  }
}

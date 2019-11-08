import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { AtIcon } from 'taro-ui'
import m_ from '@/utils/mini-lodash'
import NavigationService from '@/nice-router/navigation.service'
import EleFooterTabs from '@/genericpage/elements/ele-footer-tabs'

import './question-detail.scss'


const mockList = [
  {
    id: 1,
    title: '什么是区块链?',
    correctAnswerId: 'C',
    choices: [
      { id: 'A', text: '由攀成钢专门打造，千年寒铁构成' },
      { id: 'B', text: '别说了，就是比特币' },
      { id: 'C', text: '区块链是分布式数据存储、点对点传输、共识机制、加密算法等计算机技术的新型应用模式' },
      { id: 'D', text: '骗人的，跟0f0一样要交押金的' },
    ],
  },
  {
    id: 2,
    title: '什么222?',
    correctAnswerId: 'D',
    choices: [
      { id: 'A', text: '由攀成sdf构成' },
      { id: 'B', text: '别说asdf比特币' },
      { id: 'C', text: '区块链是分布式数据存储、点对点传输、共识机制、加密算法等计算机技术的新型应用模式' },
      { id: 'D', text: '骗人的，跟asdf交押金的' },
    ],
  },
  {
    id: 4,
    title: '我我我我我?',
    correctAnswerId: 'D',
    choices: [
      { id: 'A', text: '由攀成sdf构成' },
      { id: 'B', text: '别说asdf比特币' },
      { id: 'C', text: '区块链是分布式数据存储、点对点传输、共识机制、加密算法等计算机技术的新型应用模式' },
      { id: 'D', text: '骗人的，跟asdf交押金的' },
    ],
  },
]


export default class QuestionDetailPage extends Taro.PureComponent {

  state = {
    selected: null,
    current: 0,
    theLastAnswer: 0,
  }

  handleChoose = (item) => {
    const selected = item.id
    const { questionList = mockList } = this.props
    const question = questionList[this.state.current]
    this.setState(pre => ({
      selected,
      theLastAnswer: pre.theLastAnswer + 1,
    }), () => {
      NavigationService.ajax('/post-answer', {
        id: question.id,
        answer: selected,
      })
    })
  }

  changeQuestion = (item) => {
    const { code } = item
    if (code === 'go-next') {
      this.setState(pre => ({
        current: pre.current + 1,
        selected: null,
      }))
      return
    }
    if (code === 'go-pre') {
      this.setState(pre => ({
        current: pre.current - 1,
        selected: null,
      }))
      return
    }

    NavigationService.view('view-score')
  }

  render() {
    const { questionList = mockList } = this.props
    const { title, choices, correctAnswerId, desc } = questionList[this.state.current]
    const answered = !m_.isEmpty(this.state.selected)
    const correct = this.state.selected === correctAnswerId
    const isTheLastOne = this.state.current === questionList.length - 1
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
            <View className='question-title-txt'>({this.state.current + 1}/{questionList.length})</View>
            <View className='question-title-number'>{title}</View>
          </View>

          <View className='question-choices'>
            {
              choices.map(it => {

                  const cls = classNames('question-choices-item', {
                    hidden: answered && (it.id !== this.state.selected && it.id !== correctAnswerId),
                    correct: answered && it.id === correctAnswerId,
                    notCorrect: answered && it.id === this.state.selected && !correct,
                  })

                  return (
                    <View key={it.id} className={cls} onClick={this.handleChoose.bind(this, it)}>
                      {
                        answered && !correct && it.id === this.state.selected && <AtIcon size='small' value='close' />
                      }
                      <View className='question-choices-item-id'>{it.id}.</View>
                      <View className='question-choices-item-txt'>{it.text}</View>
                      {
                        answered && (it.id === correctAnswerId) && <AtIcon value='check-circle' />
                      }
                    </View>
                  )
                },
              )
            }
          </View>

          {
            this.state.current < this.state.theLastAnswer && <View>
              <View>
                {desc}
              </View>
              <EleFooterTabs
                onClick={this.changeQuestion}
                tabs={footerTabs}
              />
            </View>
          }
        </View>
      </View>
    )
  }
}

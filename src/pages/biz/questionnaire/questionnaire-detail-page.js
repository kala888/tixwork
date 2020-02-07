import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon, AtTag } from 'taro-ui'
import EleButton from '@/genericpage/elements/ele-button'
import Listof from '@/listof/listof'
import GlobalToast from '@/nice-router/global-toast'
import classNames from 'classnames'
import './styles.scss'

class QuestionnaireDetailPage extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  handlePreview = async () => {
    const { downloadUrl } = this.props

    console.log('preview document', downloadUrl)
    if (!downloadUrl) {
      return
    }
    try {
      Taro.showLoading({ title: '正在打开文件...', mask: true })
      const res = await Taro.downloadFile({ url: downloadUrl })
      await Taro.openDocument({ filePath: res.tempFilePath })
    } catch (e) {
      Taro.showToast({ title: '文件打开失败，稍后重试', icon: 'none' })
    } finally {
      Taro.hideLoading()
    }
  }

  handleCopy = () => {
    const { incompleteList = [] } = this.props
    const listStr = incompleteList.map((it) => it.name).join(',')
    Taro.setClipboardData({
      data: listStr,
      success: () => {
        GlobalToast.show({ text: '名单已经复制成功' })
      },
    })
  }

  onShareAppMessage(res) {
    console.log(res)
    const { actions = {} } = this.props
    const { share = {} } = actions
    const { shareTitle = '2020-02-10中心小学三年级五班的健康检测表', linkToUrl, imageUrl } = share
    const encodePath = encodeURIComponent(linkToUrl)
    return {
      title: shareTitle,
      path: `/pages/biz/questionnaire/questionnaire-detail-page?q=${encodePath}`,
      imageUrl,
    }
  }

  I

  render() {
    const {
      org = '中心小学',
      group = '三年级二班',
      totalUser = 1,
      completed = 1,
      risk = 10,
      incompleteList = defaultIncompleteList,
    } = this.props

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

        {incompleteList.length > 0 && (
          <View className='incomplete-section' onLongPress={this.handleCopy}>
            <View className='incomplete-section-title'>未填报名单（长按复制）</View>
            <View className='incomplete-section-list'>
              {incompleteList.map((it) => {
                const { id, name } = it
                return (
                  <View className='incomplete-section-list-item' key={id}>
                    <AtTag customClass='incomplete-section-list-item' size='small' type='primary'>
                      {name}
                    </AtTag>
                  </View>
                )
              })}
            </View>
          </View>
        )}

        <Listof list={questionnaireAnswer} displayMode='questionnaire-answer' />

        <View className='detail-footer'>
          <View className='detail-footer-btn'>
            <EleButton onClick={this.handlePreview} title='导出Excel' />
          </View>
          <View className='detail-footer-btn'>
            <EleButton btnType='share' title='继续分享调查' />
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

const defaultIncompleteList = [
  { id: 1, name: '张飒' },
  { id: 2, name: '李大炮' },
  { id: 3, name: '王莉' },
]

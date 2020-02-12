import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon, AtTag } from 'taro-ui'
import EleButton from '@/genericpage/elements/ele-button'
import Listof from '@/listof/listof'
import GlobalToast from '@/nice-router/global-toast'
import classNames from 'classnames'
import { formatTime } from '@/utils/index'
import { connect } from '@tarojs/redux'
import NavigationService from '@/nice-router/navigation.service'

import './styles.scss'

@connect(({ surveyDetail }) => ({ ...surveyDetail }))
class SurveyDetailPage extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  componentDidMount() {
    const { q } = this.$router.params
    if (q) {
      const uri = decodeURIComponent(q)
      NavigationService.view(uri)
    }
  }

  onPullDownRefresh = () => {
    const { pageLinkToUrl } = this.props
    NavigationService.ajax(
      pageLinkToUrl,
      {},
      {
        onSuccess: () => {
          Taro.stopPullDownRefresh()
        },
      }
    )
  }

  handlePreview = async () => {
    const { actions = {} } = this.props
    const { download } = actions
    if (download) {
      NavigationService.ajax(
        download,
        {},
        {
          onSuccess: async (resp) => {
            const { url } = resp
            if (!url) {
              return
            }
            await Taro.setClipboardData({
              data: url,
              success: () => {
                GlobalToast.show({ text: '文件地址已经复制，直接黏贴可以分享给他人', duration: 5000 })
              },
            })

            try {
              Taro.showLoading({ title: '正在打开文件...', mask: true })
              const res = await Taro.downloadFile({ url })
              await Taro.openDocument({ filePath: res.tempFilePath })
            } catch (e) {
              Taro.showToast({ title: '文件打开失败，稍后重试', icon: 'none' })
            } finally {
              Taro.hideLoading()
            }
          },
        }
      )
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

  //分享这个页面，其实是分享调查表
  onShareAppMessage(res) {
    console.log(res)
    const { actions = {} } = this.props
    const { share = {} } = actions
    const { shareTitle, linkToUrl, imageUrl } = share
    const encodePath = encodeURIComponent(linkToUrl)
    return {
      title: shareTitle,
      path: `/pages/biz/survey/survey-page?q=${encodePath}`,
      imageUrl,
    }
  }

  render() {
    const {
      school = '中心小学',
      schoolClass = '三年级二班',
      classSize,
      answerCount,
      riskCount,
      repliedList = [],
      noReplyList = [],
      surveyDate,
    } = this.props

    const riskCls = classNames('survey-body-item', { risk: riskCount > 0 })
    return (
      <View className='survey-detail-page'>
        <View className='detail-header'>
          <View className='detail-header-org'>
            {school}-{schoolClass}
          </View>
          <View className='detail-header-time'>{formatTime(surveyDate)}</View>

          <View className='survey-body'>
            <View className='survey-body-item'>
              <View className='survey-body-item-icon'>
                <AtIcon value='user' />
              </View>
              <View className='survey-body-item-txt'>共{classSize}人</View>
            </View>
            <View className='survey-body-item'>
              <View className='survey-body-item-icon'>
                <AtIcon value='check' />
              </View>
              <View className='survey-body-item-txt'>{answerCount}人完成</View>
            </View>
            <View className={riskCls}>
              <View className='survey-body-item-icon'>
                <AtIcon value='bell' />
              </View>
              <View className='survey-body-item-txt'>{riskCount}人风险</View>
            </View>
          </View>
        </View>

        {noReplyList.length > 0 && (
          <View className='incomplete-section' onLongPress={this.handleCopy}>
            <View className='incomplete-section-title'>未填报名单（长按复制）</View>
            <View className='incomplete-section-list'>
              {noReplyList.map((it) => {
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

        <Listof list={repliedList} displayMode='survey-answer' emptyMessage='还没有人填写调查表，稍等' />

        <View className='footer-button'>
          <View className='footer-button-btn'>
            <EleButton onClick={this.handlePreview} title='导出Excel' />
          </View>
          <View className='footer-button-btn'>
            <EleButton btnType='share' title='继续分享调查' />
          </View>
        </View>
      </View>
    )
  }
}

export default SurveyDetailPage

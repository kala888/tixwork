import Taro from '@tarojs/taro'

import EleCard from '@/genericpage/elements/ele-card'

const downloadIcon =
  'https://doublechain-public.oss-cn-hangzhou.aliyuncs.com/yourong/assets/icons/icon_xiazai%402x.png?x-oss-process=style/origin'

class DocumentCardTemplate extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  handleConfirm = () => {}

  render() {
    const { item = {} } = this.props
    const { imageUrl, title, brief, createTime, actions = {}, status, documentUrl } = item
    const { confirmAction = { title: '待确认', disabled: false } } = actions

    const actionList = []

    if (confirmAction) {
      actionList.push({
        ...confirmAction,
        customStyle: {
          backgroundColor: confirmAction.disabled ? '#CDC6B9' : '#D2AB66',
          borderColor: confirmAction.disabled ? '#CDC6B9' : '#D2AB66',
        },
        onClick: this.handleConfirm,
      })
    }

    actionList.push({
      id: 'open-document',
      btnType: 'open-document',
      linkToUrl: documentUrl,
      title: '查看',
    })
    actionList.push({
      id: 'download-document',
      btnType: 'download',
      linkToUrl: documentUrl,
      title: '下载',
      imageUrl: downloadIcon,
    })

    return (
      <EleCard
        title={title}
        imageUrl={imageUrl}
        brief={brief}
        time={createTime}
        status={status}
        actionList={actionList}
      />
    )
  }
}

export default DocumentCardTemplate

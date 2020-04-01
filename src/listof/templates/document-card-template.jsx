import Taro from '@tarojs/taro'

import EleCard from '@/genericpage/elements/ele-card'

class DocumentCardTemplate extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  render() {
    const { item = {} } = this.props
    const { imageUrl, title, brief, createTime, actionList = [], status, downloadUrl, linkToUrl } = item

    actionList.push({
      id: 'open-document',
      btnType: 'open-document',
      linkToUrl: downloadUrl,
      title: '查看',
    })
    actionList.push({
      id: 'download-document',
      btnType: 'download',
      linkToUrl: downloadUrl,
      title: '下载',
    })

    return (
      <EleCard
        title={title}
        imageUrl={imageUrl}
        brief={brief}
        time={createTime}
        status={status}
        actionList={actionList}
        linkToUrl={linkToUrl}
      />
    )
  }
}

export default DocumentCardTemplate

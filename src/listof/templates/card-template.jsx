import Taro from '@tarojs/taro'

import EleCard from '@/genericpage/elements/ele-card'
import { View } from '@tarojs/components'
import '../listof.scss'

class CardTemplate extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  render() {
    const { item = {} } = this.props
    const { imageUrl, title, brief, createTime, actionList = [], status, documentUrl, linkToUrl } = item

    if (documentUrl) {
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
      })
    }

    return (
      <View className='card'>
        <EleCard
          title={title}
          imageUrl={imageUrl}
          brief={brief}
          time={createTime}
          status={status}
          actionList={actionList}
          linkToUrl={linkToUrl}
        />
      </View>
    )
  }
}

export default CardTemplate

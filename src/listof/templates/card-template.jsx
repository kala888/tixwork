import EleCard from '@/components/elements/ele-card'
import { View } from '@tarojs/components'

import './styles.scss'

function CardTemplate(props) {
  const { item = {} } = props
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
    actionList.push({
      id: 'download-document',
      btnType: 'copy',
      linkToUrl: documentUrl,
      title: '复制连接',
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

CardTemplate.options = {
  addGlobalClass: true,
}
export default CardTemplate

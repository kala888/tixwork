import { getImageUrl } from '@/listof/listof-helper'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import EleCard from '@/listof/templates/card/ele-card'
import './styles.scss'

function EleCardTemplate(props) {
  const { item = {}, mode: globalMode = [] } = props
  const { title, brief, flag = '', status, actionList = [], documentUrl, linkToUrl } = item
  const { level = 'default', mode = 'square' } = item

  const imageUrl = getImageUrl(item)
  const hasImage = isNotEmpty(imageUrl)
  let extClass = globalMode.concat(mode, hasImage ? 'no-bg' : level)

  const documentActions = isNotEmpty(documentUrl)
    ? [
        {
          id: 'open-document',
          btnType: 'open-document',
          linkToUrl: documentUrl,
          title: '查看',
        },
        {
          id: 'download-document',
          btnType: 'download',
          linkToUrl: documentUrl,
          title: '下载',
        },
        {
          id: 'download-document',
          btnType: 'copy',
          linkToUrl: documentUrl,
          title: '复制连接',
        },
      ]
    : []
  const cardActionList = actionList.concat(documentActions).slice(0, 4)

  return (
    <EleCard
      title={title}
      brief={brief}
      imageUrl={imageUrl}
      mode={extClass}
      status={status}
      flag={flag}
      actionList={cardActionList}
    />
  )
}

export default EleCardTemplate

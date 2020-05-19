import React from 'react'
import EleCard from '@/components/elements/ele-card/ele-card'
import { isNotEmpty } from '@/nice-router/nice-router-util'

import ListofUtil from '../../listof-util'
import '../styles.scss'

function CardTemplate(props) {
  const { item = {}, mode: globalMode = [] } = props
  const { title, brief, flag = '', status, actionList = [], documentUrl, linkToUrl } = item
  const { level = '', mode = '' } = item

  const imageUrl = ListofUtil.getImageUrl(item)
  const hasImage = isNotEmpty(imageUrl)
  const isDocument = isNotEmpty(documentUrl)
  let extClass = globalMode.concat(mode, hasImage ? 'no-bg' : level, isDocument ? 'large' : '')

  const documentActions = isDocument
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
          id: 'copy-document',
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
      linkToUrl={linkToUrl}
    />
  )
}

export default CardTemplate

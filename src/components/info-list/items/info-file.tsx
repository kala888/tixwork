import React from 'react'
import { View } from '@tarojs/components'

import EleActionList from '@/components/elements/action-list/ele-action-list'
import './styles.scss'

function InfoFile(props) {
  const { value: linkToUrl } = props
  return (
    <View className='info-file'>
      <EleActionList
        mode='small'
        list={[
          {
            id: 'open-document',
            btnType: 'open-document',
            linkToUrl,
            title: '查看',
          },
          {
            id: 'download-document',
            btnType: 'download',
            linkToUrl,
            title: '下载',
          },
          {
            id: 'download-copy',
            btnType: 'copy',
            title: '分享',
            extraData: linkToUrl,
          },
        ]}
      />
    </View>
  )
}

export default InfoFile

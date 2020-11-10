import { View } from '@tarojs/components'
import React from 'react'

import FlexInfoItem from '@/components/info-list/flex-info-item'
import SectionBar from '@/components/section-bar/section-bar'
import './flex-info-list.scss'

/**
 * title  section 名字(optional)
 * onClick section 点击事件(optional)
 * linkToUrl section 点击是触发的action(optional)
 *
 * items FlexInfoItems（required）[{id:1,type:'longtext',value:'hello'}]
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function FlexInfoList(props) {
  const { items = [], ...others } = props
  return (
    <View className='flex-info-list'>
      <SectionBar {...others}>
        <View className='flex-info-list-body'>
          {items.map((it, idx) => (
            <FlexInfoItem key={`the-group-item-${idx}`} {...it} />
          ))}
        </View>
      </SectionBar>
    </View>
  )
}

FlexInfoList.defaultProps = {
  title: '',
  items: [],
  foldable: null,
  expand: true,
}
export default FlexInfoList

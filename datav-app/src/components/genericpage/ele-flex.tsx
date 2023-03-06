import React from 'react'
import EleButton from '@/components/elements/ele-button'
import EleCard from '@/components/elements/ele-card/ele-card'
import EleRichText from '@/components/elements/ele-rich-text'
//从主要包中引入
import EleForm from '@/components/form/ele-form'
import Listof from '@/listof/listof'

//generic-page 专用，不分享给其他包的
import EleText from './elements/ele-text'
import EleWhiteSpace from './elements/ele-white-space'

import { StyleSheet, View } from 'react-native'
import FlexInfoList from '@/components/info-list/flex-info-list'
import EleTable from '@/components/elements/ele-table/ele-table'
import EleImageList from '@/components/elements/ele-image-list'

type EleFlexItem = {
  id: string;
  type: string;
};

type EleFlexProps = {
  flex?: number;
  kids: EleFlexItem[];
  style?: any
};

/**
 * 其他组件模块用的ui组件，要扔到主App去share
 */
function EleFlex(props: EleFlexProps) {
  const { kids, style } = props
  const rootClass = [styles.container, style]
  return (
    <View className={rootClass}>
      {kids.map((it: any, idx) => {
        const key = `ele-flex-item-${idx}-${it.id}`
        if (it.type === 'text') {
          return <EleText key={key} {...it} />
        }
        if (it.type === 'button') {
          return <EleButton key={key} {...it} />
        }
        if (it.type === 'white-space') {
          return <EleWhiteSpace key={key} {...it} />
        }
        if (it.type === 'image-list') {
          return <EleImageList key={key} {...it} />
        }
        if (it.type === 'listof') {
          return <Listof key={key} {...it} />
        }
        if (it.type === 'rich-text') {
          return <EleRichText key={key} {...it} />
        }
        if (it.type === 'ele-card') {
          return <EleCard key={key} {...it} />
        }

        if (it.type === 'info-list') {
          return <FlexInfoList key={key} {...it} />
        }

        if (it.type === 'ele-table') {
          return <EleTable key={key} {...it} />
        }

        if (it.type === 'form') {
          return <EleForm key={key} {...it} fields={it.kids} />
        }

        if (it.type === 'flex') {
          return (
            // Taro && wechat-mini-program could not support self reference, using it as mini-program component
            <View key={key} className='flex-row' style={{ flex: it.flex || 1 }}>
              <View style={{ width: '100%', height: '100%' }}>
                <EleFlex {...it} />
              </View>
            </View>
          )
        }
        return null
      })}
    </View>
  )
}

EleFlex.options = {
  multipleSlots: true,
}

EleFlex.defaultProps = {
  flex: 1,
  kids: [], //children的同义词，不用children，微信有问题
  customStyle: {},
}

export default EleFlex


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    position: 'relative',
  },
})

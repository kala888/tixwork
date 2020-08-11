import React from 'react'
import { View } from '@tarojs/components'
import EleRichText from '@/components/elements/ele-rich-text'
import './styles.scss'

export default function RichTextTemplate({ item = {} }) {
  console.log('item....', item)
  const { content = '' } = item
  return (
    <View className='rich-text'>
      <EleRichText content={content} />
    </View>
  )
}

import React from 'react'
import EleCarousel from '@/components/elements/ele-carousel'
import { View } from '@tarojs/components'
import './styles.scss'

function InfoImageList(props) {
  const { value } = props
  return (
    <View className='info-image-list'>
      <EleCarousel items={value} indicatorActiveColor='#5ebfff' customStyle={{ borderRadius: '10px' }} />
    </View>
  )
}

export default InfoImageList

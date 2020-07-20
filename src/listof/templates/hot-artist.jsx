import React from 'react'
import { View } from '@tarojs/components'
import './styles.scss'

function HotArtist({ item = {} }) {
  const { artistResume } = item

  return <View>{artistResume}</View>
}

export default HotArtist

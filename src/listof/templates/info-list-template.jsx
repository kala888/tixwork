import React from 'react'
import FlexInfoList from '@/components/info-list/flex-info-list'

export default function InfoListTemplate({ item = {} }) {
  return <FlexInfoList {...item} foldable />
}

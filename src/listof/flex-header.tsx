import SearchBar from '@/listof/search-bar'
import EleTabs from '@/components/elements/ele-tabs'
import FlexLineItem from '@/listof/templates/flex-line-item'
import React from 'react'

export default function FlexHeader(props) {
  const { type } = props
  if (type === 'search') return <SearchBar {...props} />
  if (type === 'tabs') return <EleTabs {...props} type={props.tabsType} />
  return <FlexLineItem {...props} />
}

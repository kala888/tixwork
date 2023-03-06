import SearchBar from '@/listof/search-bar'
import FlexLineItem, { FlexLineItemProps } from '@/listof/templates/flex-line-item'
import React from 'react'
import EleTabs from '@/components/elements/ele-tabs'
import EleRichText from '@/components/elements/ele-rich-text'

type FlexHeaderProps = {
  type?: 'search' | 'tabs' | string;
  tabsType?: string;
  content?: any;
  tabs?: any;
} & Partial<FlexLineItemProps>;

export default function FlexHeader(props: FlexHeaderProps) {
  const { type, ...rest } = props
  if (type === 'search') {
    return <SearchBar {...rest} />
  }
  if (type === 'tabs') {
    return <EleTabs {...rest} />
  }
  if (type === 'rich-text') {
    return <EleRichText  {...rest} />
  }
  return <FlexLineItem {...props} />
}

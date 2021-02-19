import SearchBar from '@/listof/search-bar';
import EleTabs from '@/components/elements/ele-tabs';
import FlexLineItem, { FlexLineItemProps } from '@/listof/templates/flex-line-item';
import React from 'react';

type FlexHeaderProps = {
  type?: 'search' | 'tabs' | string;
  tabsType?: string;
  tabs?: any;
} & Partial<FlexLineItemProps>;

export default function FlexHeader(props: FlexHeaderProps) {
  const { type } = props;
  if (type === 'search') return <SearchBar {...props} />;
  if (type === 'tabs') return <EleTabs {...props} />;
  return <FlexLineItem {...props} />;
}

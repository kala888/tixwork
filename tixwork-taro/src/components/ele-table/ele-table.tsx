import { View } from '@tarojs/components';
import React from 'react';
import EleTableRow, { EleTableRowProps } from '@/components/ele-table/ele-table-row';
import { getExtMode } from '@/nice-router/nice-router-utils';

import './ele-table.less';
import ObjectUtils from '@/utils/object-utils';

type EleTableProps = {
  title?: string;
  data?: EleTableRowProps[];
  children?: React.ReactNode;
  className?: string;
  bordered?: boolean;
};

function EleTable(props: EleTableProps) {
  const { title, data = [], bordered = true, className } = props;
  const rootClass = getExtMode({ bordered }).classNames('ele-table', className);
  return (
    <View className={rootClass}>
      {ObjectUtils.isNotEmpty(title) && <View className='ele-table-title'>{title}</View>}
      {data.map((row, idx) => (
        <EleTableRow key={`ele-table-row-${idx}`} items={row.items} header={row.header} />
      ))}
      {props.children}
    </View>
  );
}

export default EleTable;

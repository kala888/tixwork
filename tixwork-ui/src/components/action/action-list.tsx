import FileExport from '@/components/file/file-export';
import FileImport from '@/components/file/file-import';
import type { ActionList as Actions } from '@/utils/nice-router-types';
import { Space } from 'antd';
import _ from 'lodash';
import React from 'react';
import ViewButton from './view-button';

type ActionListType = {
  items: Actions;
  params?: Record<string, any>;
  onSuccess?: () => void;
};

const ActionsMapping: Record<string, any> = {
  export: FileExport,
  import: FileImport,
  view: ViewButton,
};

export default function ActionList(props: ActionListType) {
  const { items = [], params, onSuccess } = props;
  return (
    <Space>
      {items.map((it) => {
        if (React.isValidElement(it)) {
          return React.cloneElement(it, { params, onSuccess } as any);
        }
        const Component = _.get(ActionsMapping, it?.code as any) || ViewButton;
        return (
          <Component
            key={it?.code + '_' + it.title}
            params={params}
            onSuccess={onSuccess}
            {...it}
          />
        );
      })}
    </Space>
  );
}

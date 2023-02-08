import React from 'react';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import FileExport from '@/components/file/file-export';
import FileImport from '@/components/file/file-import';
import type { ActionList } from '@/utils/nice-router-types';
import _ from 'lodash';
import SimpleViewButton from './simple-view-button';

type TableActionListType = {
  items?: ActionList | false;
  searchValues: Record<string, any>;
  onRefresh: () => void;
  onAdd: () => void;
};

const ActionsMapping = {
  export: FileExport,
  import: FileImport,
  view: SimpleViewButton,
};

export default function TableActionList(props: TableActionListType) {
  const { items = [], searchValues, onRefresh, onAdd } = props;
  if (items === false) {
    return null;
  }
  const actionList = [...items];

  if (onAdd) {
    actionList.push(
      <Button key="add-button" type="primary" onClick={onAdd}>
        <PlusOutlined />
        新增
      </Button>,
    );
  }
  return (
    <Space>
      {actionList.map((it) => {
        if (React.isValidElement(it)) {
          return it;
        }
        //@ts-ignore
        const Component = _.get(ActionsMapping, it.type) || SimpleViewButton;
        return (
          <Component
            key={it?.code + '_' + it.title}
            title={it.title}
            linkToUrl={it.linkToUrl}
            values={searchValues}
            onSuccess={onRefresh}
          />
        );
      })}
    </Space>
  );
}

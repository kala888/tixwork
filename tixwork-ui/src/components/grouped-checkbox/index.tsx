import ClickableItem from '@/components/form/fields/clickable-item';
import { SearchOutlined } from '@ant-design/icons';
import type { ProFormFieldProps } from '@ant-design/pro-components';
import { ProFormField } from '@ant-design/pro-components';
import { App, Tag } from 'antd';
import React from 'react';
import GroupedCheckboxField from './field';

type GroupCheckboxFieldType = {
  label: string;
  name: string;
  value: any;
  onChange: (checkedList: any[] | null) => void;
  options: GroupItemType[];
  placeholder?: string;
  width?: ProFormFieldProps['width'];
  disabled?: boolean;
  popup?: boolean;
};

type GroupItemType = {
  id: React.Key;
  title?: string;
  children: {
    id: React.Key;
    title?: string;
  }[];
};

function GroupCheckboxField(props: GroupCheckboxFieldType) {
  const { modal } = App.useApp();
  const { popup, width, ...rest } = props;
  const { disabled, onChange } = rest;

  const handleClear = () => {
    if (onChange) {
      onChange(null);
    }
  };

  const content = <GroupedCheckboxField {...rest} onChange={onChange} />;
  const handleShow = () => {
    modal.success({
      closable: true,
      icon: null,
      width: '60vw',
      okText: '确定',
      title: `选择${props.label}`,
      content,
    });
  };

  if (popup) {
    return (
      <ClickableItem
        onClick={handleShow}
        value={props.value}
        itemRender={(displayName: any) => <Tag>{displayName}</Tag>}
        width={width}
        disabled={disabled}
        onClear={handleClear}
        suffix={<SearchOutlined style={{ color: '#ccc' }} />}
      />
    );
  }
  return content;
}

type GroupedCheckboxType = {
  fieldProps?: any;
} & Partial<GroupCheckboxFieldType>;
export default function GroupedCheckbox(props: GroupedCheckboxType) {
  return (
    <ProFormField {...props} className={'customized-form-item'}>
      <GroupCheckboxField {...props} {...props.fieldProps} />
    </ProFormField>
  );
}

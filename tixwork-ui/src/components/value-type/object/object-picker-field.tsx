import BizSchema from '@/biz-models/biz-schema';
import ClickableItem from '@/components/form/fields/clickable-item';
import SearchForm from '@/components/value-type/object/search-form';
import { getDisplayName } from '@/utils';
import ObjectUtils from '@/utils/object-utils';
import { SearchOutlined } from '@ant-design/icons';
import type { ProFormFieldProps } from '@ant-design/pro-components';
import { App, Typography } from 'antd';
import _ from 'lodash';
import React from 'react';

export type ObjectPickerSearchFieldType = {
  dataIndex: string;
  title: string;
  hideInSearch?: boolean;
  hideInTable?: boolean;
};
export type ObjectPickerFieldType = {
  linkToUrl: string;
  objectType?: string;
  fields?: ObjectPickerSearchFieldType[];
  placeholder?: string;
  width?: ProFormFieldProps['width'];
  disabled?: boolean;
  value?: any;
  onChange?: (record?: any, all?: any[]) => void;
  target: React.FC<{ onClick: () => void; disabled?: boolean }>;
  children?: React.ReactElement;
  allDuplicates?: boolean; //结果是否允许重复值
  params?: Record<string, any>;
  suffix?: false | React.ReactNode;
  tips?: string;
};

const defaultFields: any[] = [
  { dataIndex: 'id', title: 'ID' },
  { dataIndex: 'displayName', title: '名称', hideInSearch: true },
];

const getUrl = (props) => {
  if (ObjectUtils.isNotEmpty(props.linkToUrl)) {
    return props.linkToUrl;
  }
  const schema = BizSchema.get(props.objectType);
  if (!schema) {
    throw new Error('没有在BizSchema中找到' + props.objectType);
  }
  return `${schema?.linkToUrl}/list`;
};

export default (props: ObjectPickerFieldType) => {
  const { modal } = App.useApp();
  const { tips, placeholder, suffix, target, onChange, width, disabled, params, fields = defaultFields } = props;
  const linkToUrl = getUrl(props);
  let modalKey: any = null;

  const handleChange = (row) => {
    if (onChange) {
      onChange(row);
      if (modalKey) {
        modalKey.destroy();
      }
    }
  };
  const handleClear = () => {
    if (onChange) {
      onChange(null);
    }
  };

  const handleShow = () => {
    modalKey = modal.success({
      closable: true,
      icon: null,
      okButtonProps: { style: { display: 'none' } },
      width: '60vw',
      content: (
        <div>
          {ObjectUtils.isNotEmpty(tips) && (
            <div style={{ paddingBottom: 20 }}>
              <Typography.Text type={'secondary'}>{tips}</Typography.Text>
            </div>
          )}
          <SearchForm columns={fields} onChange={handleChange} params={params} linkToUrl={linkToUrl} />
        </div>
      ),
    });
  };

  const Target: any = target || ClickableItem;
  const value = getDisplayName(props.value);
  let theSuffix = !_.isNil(suffix) ? suffix : <SearchOutlined style={{ color: '#ccc' }} />;
  return (
    <>
      <Target
        onClick={handleShow}
        value={value}
        width={width}
        disabled={disabled}
        onClear={handleClear}
        suffix={theSuffix}
        placeholder={placeholder}
      />
      {props.children && React.cloneElement(props.children, props)}
    </>
  );
};

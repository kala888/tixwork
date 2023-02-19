import BizSchema from '@/biz-model/biz-schema';
import ClickableItem from '@/components/form/fields/clickable-item';
import Q from '@/http/http-request/q';
import { useVisible } from '@/services/use-service';
import { guessTitle } from '@/utils';
import { isNotEmpty } from '@/utils/object-utils';
import { SearchOutlined } from '@ant-design/icons';
import type { ProFormFieldProps } from '@ant-design/pro-components';
import { ProCard, ProForm } from '@ant-design/pro-components';
import { useAsyncEffect } from 'ahooks';
import { message, Modal } from 'antd';
import _ from 'lodash';
import React, { useState } from 'react';
import ChooseTable from './choose-table';
import FieldSearch from './field-search';

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
};

const defaultFields: any[] = [
  { dataIndex: 'id', title: 'ID' },
  { dataIndex: 'displayName', title: '名称', hideInSearch: true },
];

const getUrl = (props: ObjectPickerFieldType) => {
  if (isNotEmpty(props.linkToUrl)) {
    return props.linkToUrl;
  }
  return BizSchema.get(props.objectType)?.linkToUrl + '/list';
};

export function ObjectPickerField(props: ObjectPickerFieldType) {
  const { visible, show, close } = useVisible();
  const [items, setItems] = useState<any[]>([]);
  const { target, onChange, width, disabled, fields = defaultFields } = props;

  const linkToUrl = getUrl(props);

  const handleSelect = (v) => {
    if (onChange) {
      onChange(v);
      close();
    }
  };

  useAsyncEffect(
    async function* () {
      //1.首先根据linkToUrl获取到对应的初始化数据
      if (visible) {
        const resp = await Q.post<API.TableDataInfo<any>>(linkToUrl);
        const theItems = _.slice(resp?.data.rows, 0, 100);
        setItems(theItems);
      }
    },
    [linkToUrl, visible],
  );

  const handleSearch = async (values) => {
    //1.点击search后向linkToUrl搜索数据
    const resp = await Q.post<API.TableDataInfo<any>>(linkToUrl, {
      [values.fieldName]: values.fieldValue,
    });
    const rows = resp.data.rows || [];
    if (rows.length === 0) {
      message.info('没找到更多的数据');
      setItems([]);
      return;
    }
    if (rows.length > 100) {
      message.info('数据太多了，请修改输入搜索条件');
      setItems(_.slice(rows, 0, 100));
      return;
    }
    setItems(rows);
  };

  const Target: any = target || ClickableItem;
  const title = guessTitle(props.value);

  const searchFields = fields
    .filter((it) => !it.hideInSearch)
    .map((it) => ({
      label: it.title,
      value: it.dataIndex,
    }));
  const tableFields = fields.filter((it) => !it.hideInTable);
  return (
    <>
      <Target
        onClick={show}
        value={title}
        width={width}
        disabled={disabled}
        suffix={<SearchOutlined />}
      />
      {props.children && React.cloneElement(props.children, props)}
      <Modal
        open={visible}
        closable
        onCancel={close}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        width="60vw"
      >
        <ProCard>
          <ProForm
            onFinish={handleSearch}
            layout={'inline'}
            submitter={{
              searchConfig: {
                submitText: '搜索',
              },
            }}
          >
            <FieldSearch fields={searchFields} />
          </ProForm>
        </ProCard>
        <ChooseTable items={items} onSelect={handleSelect} fields={tableFields} />
      </Modal>
    </>
  );
}

import { ProFormItem, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Space } from 'antd';

type FieldSearchType = {
  fields?: {
    label: string;
    value: string;
  }[];
  [key: string]: any;
};

const defaultFields = [{ value: 'id', label: 'ID' }];

const FieldSearchInput = (props) => {
  const { options = [] } = props;

  return (
    <Space>
      <ProFormSelect
        initialValue={options![0]?.value}
        name="fieldName"
        options={options}
        allowClear={false}
      />
      <ProFormText
        name="fieldValue"
        placeholder={'请输入搜索条件'}
        allowClear={false}
        width={200}
      />
    </Space>
  );
};

export default (props: FieldSearchType) => {
  const { label, fields = defaultFields, ...rest } = props;

  return (
    <ProFormItem label={label} {...rest}>
      <FieldSearchInput options={fields} {...rest} />
    </ProFormItem>
  );
};

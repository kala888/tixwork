import { isNotEmpty } from '@/utils/object-utils';
import { ProFormSelect, ProFormText } from '@ant-design/pro-components';
import ProFormItem from '@ant-design/pro-form/es/components/FormItem';
import { Space } from 'antd';

export type FieldSearchOptionType = {
  fieldName: string;
  fieldLabel: string;
};
type FieldSearchType = {
  fields?: FieldSearchOptionType | FieldSearchOptionType[];
  [key: string]: any;
};

const defaultFields = [
  { fieldName: 'title', fieldLabel: '名称' },
  { fieldName: 'id', fieldLabel: 'ID' },
];

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

export default function FieldSearch(props: FieldSearchType) {
  const { label, fields, ...rest } = props;
  let fieldList: any[] = defaultFields;
  if (isNotEmpty(fields)) {
    fieldList = Array.isArray(fields) ? fields : [fields];
  }
  const options = fieldList.map((it) => ({ label: it.fieldLabel, value: it.fieldName }));

  return (
    <ProFormItem label={label} {...rest}>
      <FieldSearchInput options={options} {...rest} />
    </ProFormItem>
  );
}

import { parseToArray } from '@/utils/object-utils';
import { PlusOutlined } from '@ant-design/icons';
import { ProFormItem } from '@ant-design/pro-components';
import { Button } from 'antd';
import _ from 'lodash';
import { ObjectListTable } from './object-list-table';
import type { ObjectPickerType } from './object-picker';
import type { ObjectPickerFieldType } from './object-picker-field';
import { ObjectPickerField } from './object-picker-field';
import styles from './styles.less';

const LinkTarget = (props) => {
  const { onClick, disabled } = props;
  return (
    <div className={styles.linkTarget}>
      <Button type={'link'} onClick={onClick} disabled={disabled}>
        <PlusOutlined />
        添加
      </Button>
    </div>
  );
};

const ObjectListPickerField = (props: ObjectPickerFieldType) => {
  const { onChange, allDuplicates = false, value = [] } = props;
  const handleAdd = (record, all) => {
    const result = parseToArray(value);
    if (record && (allDuplicates || !_.find(result, record))) {
      result.push(record);
    }
    if (onChange) {
      onChange(all || result);
    }
  };
  return (
    <ObjectPickerField {...props} onChange={handleAdd} target={LinkTarget}>
      <ObjectListTable />
    </ObjectPickerField>
  );
};
export default function ObjectListPicker(props: ObjectPickerType) {
  const { label, value, fields, linkToUrl, objectType, width, fieldProps, proFieldKey, ...rest } =
    props;

  return (
    <ProFormItem label={label} {...rest} className="customized-form-item">
      <ObjectListPickerField {...props} {...props.fieldProps} />
    </ProFormItem>
  );
}

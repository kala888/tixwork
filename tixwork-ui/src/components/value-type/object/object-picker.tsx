import { ProFormItem } from '@ant-design/pro-components';
import type { ObjectPickerFieldType } from './object-picker-field';
import { ObjectPickerField } from './object-picker-field';
import styles from './styles.less';

export type ObjectPickerType = Record<string, any> & Partial<ObjectPickerFieldType>;

/**
 * 自定义ProComponent例子, fieldProps，可以展开也可以不展开,里面自动注入了value和onChange
 */
export default function ObjectPicker(props: ObjectPickerType) {
  const { label, fields, linkToUrl, objectType, fieldProps, proFieldKey, width, ...rest } = props;
  return (
    <div className={styles.objectPicker}>
      <ProFormItem label={label} {...rest}>
        <ObjectPickerField {...props} {...props.fieldProps} width={width} />
      </ProFormItem>
    </div>
  );
}

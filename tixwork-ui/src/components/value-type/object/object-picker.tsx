import { ProFormItem } from '@ant-design/pro-components';
import type { ObjectPickerFieldType } from './object-picker-field';
import ObjectPickerField from './object-picker-field';

export type ObjectPickerType = Record<string, any> & Partial<ObjectPickerFieldType>;

/**
 * 自定义ProComponent例子, fieldProps，可以展开也可以不展开,里面自动注入了value和onChange
 */
export default function ObjectPicker(props: ObjectPickerType) {
  const { name, label, className, rules, fieldProps, width = 'xl', ...rest } = props;
  return (
    <div className={className}>
      <ProFormItem label={label} name={name} rules={rules}>
        <ObjectPickerField {...rest} {...props.fieldProps} width={width} />
      </ProFormItem>
    </div>
  );
}

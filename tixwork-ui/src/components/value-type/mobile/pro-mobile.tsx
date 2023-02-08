import { CommonRule } from '@/components/value-type/common-column';
import { ProFormText } from '@ant-design/pro-components';

export default function ProMobile(props) {
  const rules = [CommonRule.mobile, { ...(props.rules || []) }];
  return (
    <ProFormText
      width="sm"
      {...props}
      fieldProps={{ maxLength: 11, ...props.fieldProps }}
      rules={rules}
    />
  );
}

import { CommonRule } from '@/components/value-type/common-column';
import { ProFormText } from '@ant-design/pro-components';

export default function ProMobile(props) {
  const rules = [CommonRule.mobile, { ...(props.rules || []) }];
  const handleTransform = (values) => {
    console.log('....transform', values);
    return { [props.name]: values };
  };
  return (
    <ProFormText
      transform={handleTransform}
      width="sm"
      {...props}
      fieldProps={{
        maxLength: 11,
        ...props.fieldProps,
      }}
      rules={rules}
    />
  );
}

import { CommonRule } from '@/components/value-type/common-column';
import { ProFormRadio } from '@ant-design/pro-components';

export default function EleStatus(props) {
  return (
    <ProFormRadio.Group
      label="状态"
      name="status"
      valueType="radioButton"
      fieldProps={{
        buttonStyle: 'solid',
      }}
      options={[
        { value: '0', label: '正常' },
        { value: '1', label: '停用' },
      ]}
      rules={[CommonRule.required]}
      {...props}
    />
  );
}

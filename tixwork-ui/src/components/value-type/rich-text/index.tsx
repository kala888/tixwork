import RichEditor, { RichEditorType } from '@/components/value-type/rich-text/rich-editor';
import { ProFormField, ProFormFieldProps } from '@ant-design/pro-components';

export default function ProFormRichEditor(props: RichEditorType & Partial<ProFormFieldProps>) {
  const { name, label, tooltip, rules, fieldProps = {}, ...rest } = props;

  return (
    <ProFormField name={name} label={label} rules={rules} tooltip={tooltip}>
      {/*// @ts-ignore*/}
      <RichEditor {...rest} {...fieldProps} />
    </ProFormField>
  );
}
export const RichTextValueType = {
  render: (dom) => <RichEditor value={dom} readonly />,
  renderFormItem: (__, props) => <ProFormRichEditor {...props} />,
};

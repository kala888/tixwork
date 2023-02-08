import BaseForm from '@/components/form/base-form';
import EleStatus from '@/components/form/fields/ele-status';
import { CommonRule } from '@/components/value-type/common-column';
import { ProFormDigit, ProFormText } from '@ant-design/pro-components';

const EditForm = (props) => (
  <BaseForm {...props} title="编辑职务信息">
    <ProFormText label="ID" name="postId" width="sm" hidden />
    <ProFormText label="编码" name="postCode" width="sm" rules={[CommonRule.required]} />
    <ProFormText label="名称" name="postName" width="sm" rules={[CommonRule.required]} />
    <ProFormDigit
      label="排序"
      name="sortOrder"
      width="sm"
      rules={[CommonRule.required]}
      fieldProps={{ defaultValue: 100 }}
    />
    <EleStatus />
  </BaseForm>
);
export default EditForm;

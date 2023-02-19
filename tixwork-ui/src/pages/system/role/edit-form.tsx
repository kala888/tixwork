import BaseForm from '@/components/form/base-form';
import EleStatus from '@/components/form/fields/ele-status';
import { CommonRule } from '@/components/value-type/common-column';
import { ProFormDigit, ProFormText } from '@ant-design/pro-components';

const EditForm = (props) => {
  return (
    <BaseForm {...props} title="编辑岗位信息">
      <ProFormText label="角色名" name="roleName" rules={[CommonRule.required]} />
      <ProFormText label="权限标识" name="roleKey" rules={[CommonRule.required]} />
      <ProFormDigit
        label="排序"
        name="sortOrder"
        rules={[CommonRule.required]}
        fieldProps={{ defaultValue: 100 }}
      />
      <EleStatus />
    </BaseForm>
  );
};
export default EditForm;

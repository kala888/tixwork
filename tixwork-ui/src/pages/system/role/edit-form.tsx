import BaseForm from '@/components/form/base-form';
import EleStatus from '@/components/form/fields/ele-status';
import { CommonRule } from '@/components/value-type/common-column';
import { ProFormDigit, ProFormGroup, ProFormText } from '@ant-design/pro-components';

const EditForm = (props) => {
  return (
    <BaseForm {...props} title="编辑岗位信息" width="sm">
      <ProFormGroup>
        <ProFormText label="角色名" name="roleName" width="sm" rules={[CommonRule.required]} />
        <ProFormText label="权限标识" name="roleKey" width="sm" rules={[CommonRule.required]} />
        <ProFormDigit
          label="排序"
          name="sortOrder"
          width="sm"
          rules={[CommonRule.required]}
          fieldProps={{ defaultValue: 100 }}
        />
        <EleStatus />
      </ProFormGroup>
    </BaseForm>
  );
};
export default EditForm;

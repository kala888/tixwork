import EleStatus from '@/components/form/fields/ele-status';
import ProEditForm from '@/components/form/pro-edit-form';
import { CommonRule } from '@/components/value-type/common-column';
import { ProFormDigit, ProFormText } from '@ant-design/pro-components';

const EditForm = (props) => {
  console.log('ppp', props);
  return (
    <ProEditForm
      title="岗位信息"
      initialValues={{
        sortOrder: 10,
        status: '0',
      }}
      {...props}
      disabled={props.values?.superAdmin}
    >
      <ProFormText label="角色名" name="roleName" rules={[CommonRule.required]} />
      <ProFormText label="权限标识" name="roleKey" rules={[CommonRule.required]} />
      <ProFormDigit label="排序" name="sortOrder" rules={[CommonRule.required]} />
      <EleStatus />
    </ProEditForm>
  );
};
export default EditForm;

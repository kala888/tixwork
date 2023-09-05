import EleStatus from '@/components/form/fields/ele-status';
import ProEditForm from '@/components/form/pro-edit-form';
import { CommonRule } from '@/components/value-type/common-column';
import { ProFormDigit, ProFormText } from '@ant-design/pro-components';

const EditForm = (props) => (
  <ProEditForm
    initialValues={{
      sortOrder: 10,
      status: '0',
    }}
    title="职务信息"
    {...props}
  >
    <ProFormText label="ID" name="id" width="sm" hidden />
    <ProFormText label="编码" name="postCode" rules={[CommonRule.required]} />
    <ProFormText label="名称" name="postName" rules={[CommonRule.required]} />
    <ProFormDigit label="排序" name="sortOrder" rules={[CommonRule.required]} />
    <EleStatus />
  </ProEditForm>
);
export default EditForm;

import ProEditForm from '@/components/form/pro-edit-form';
import RemoteSelect from '@/components/form/remote/remote-select';
import DeptSelector from '@/components/tree/dept-selector';
import { CommonRule } from '@/components/value-type/common-column';
import { ProFormDigit, ProFormGroup, ProFormText } from '@ant-design/pro-components';

export default (props) => (
  <ProEditForm
    {...props}
    values={{
      sortOrder: 10,
      ...props?.values,
    }}
    title="机构信息"
    size="large"
  >
    <ProFormGroup>
      <DeptSelector
        label="上级部门"
        width="sm"
        name="parentId"
        rules={[CommonRule.required]}
        disabled={props?.values?.parentId === 0}
      />
      <ProFormText label="机构名称" name="deptName" width="sm" rules={[CommonRule.required]} />

      <RemoteSelect
        label="机构类型"
        name="deptType"
        width="sm"
        allowClear={false}
        types="DepartmentType"
        rules={[CommonRule.required]}
      />
      <ProFormText label="部门负责人" name="leader" width="sm" />
      <ProFormText label="联系电话" name="mobile" width="sm" />
      <ProFormDigit label="排序" name="sortOrder" width="sm" />
    </ProFormGroup>
  </ProEditForm>
);

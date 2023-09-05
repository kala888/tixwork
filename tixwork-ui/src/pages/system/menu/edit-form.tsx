import EleStatus from '@/components/form/fields/ele-status';
import ProEditForm from '@/components/form/pro-edit-form';
import RemoteRadio from '@/components/form/remote/remote-radio';
import RemoteSelect from '@/components/form/remote/remote-select';
import MenuSelector from '@/components/tree/menu-selector';
import { CommonRule } from '@/components/value-type/common-column';
import {
  ProFormDependency,
  ProFormDigit,
  ProFormGroup,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';

const initialValues = { status: '0', visible: 'SHOW', sortOrder: 10, menuType: 'MENU' };
const EditForm = (props) => (
  <ProEditForm {...props} title="菜单信息" size={'large'} initialValues={initialValues}>
    <ProFormGroup>
      <MenuSelector label="上级菜单" width="sm" name="parentId" rules={[CommonRule.required]} />

      <RemoteSelect
        label="菜单类型"
        name="menuType"
        width="sm"
        allowClear={false}
        types="MenuType"
        rules={[CommonRule.required]}
        tooltip="目录：一级菜单。菜单：目录下面一个页面。功能：就是页面中的按钮"
      />

      <ProFormText label="菜单名称" name="name" width="sm" rules={[CommonRule.required]} />
      <ProFormText label="图标" name="icon" width="sm" />

      <ProFormDependency name={['menuType']}>
        {({ menuType }) => {
          // 目录类型，不需要地权限标识
          const params = menuType === 'FOLDER' ? { disabled: true } : { rules: [CommonRule.required] };
          return (
            <ProFormGroup>
              <ProFormText label="权限标识" name="perms" width="sm" {...params} />
              <ProFormText label="路由地址" name="path" width="sm" {...params} />
            </ProFormGroup>
          );
        }}
      </ProFormDependency>

      <ProFormText label="跳转路由" name="redirect" width="sm" />

      <ProFormDigit label="排序" name="sortOrder" width="sm" rules={[CommonRule.required]} />
    </ProFormGroup>
    <ProFormGroup>
      <RemoteRadio label="是否隐藏" name="visible" types="VisibleType" rules={[CommonRule.required]} />
      <EleStatus />
    </ProFormGroup>
    <ProFormTextArea label="备注" name="remark" />
  </ProEditForm>
);

export default EditForm;

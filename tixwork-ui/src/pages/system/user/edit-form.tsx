import type { BaseFormType } from '@/components/form/base-form';
import BaseForm from '@/components/form/base-form';
import EleStatus from '@/components/form/fields/ele-status';
import DeptSelector from '@/components/tree/dept-selector';
import { CommonRule } from '@/components/value-type/common-column';
import ProMobile from '@/components/value-type/mobile/pro-mobile';
import { RemoteRadioGroup } from '@/components/value-type/remote-enum/remote-radio';
import ApiConfig from '@/http/api-config';
import Q from '@/http/http-request/q';
import { isEmpty } from '@/utils/object-utils';
import { ProFormSelect, ProFormText } from '@ant-design/pro-components';

export async function getPostOptions() {
  const resp = await Q.get(ApiConfig.getPostOptions);
  return resp?.data?.map((it) => ({ label: it.postName, value: it.postId }));
}

export async function getRoleOptions() {
  const resp = await Q.get(ApiConfig.getRoleOptions);
  return resp?.data?.map((it) => ({ label: it.roleName, value: it.roleId }));
}

const EditForm = (props: BaseFormType) => {
  const isNew = isEmpty(props.values?.userId);
  return (
    <BaseForm title="用户信息" {...props} initialValues={{ status: '0', gender: '0' }}>
      <ProFormText label="账号" name="userName" width="sm" rules={[CommonRule.required]} />
      <ProFormText label="昵称" name="nickName" width="sm" rules={[CommonRule.required]} />
      <ProFormText label="ID" name="userId" width="sm" hidden />

      <DeptSelector label="部门" width="sm" name="deptId" />

      <ProFormSelect
        allowClear={false}
        label="岗位"
        width="sm"
        name="postIds"
        request={getPostOptions}
        mode="multiple"
        rules={[CommonRule.required]}
      />
      <ProFormSelect
        width="sm"
        allowClear={false}
        label="角色"
        name="roleIds"
        request={getRoleOptions}
        mode="multiple"
        rules={[CommonRule.required]}
      />

      <ProMobile label="手机号" name="mobile" width="sm" rules={[CommonRule.required]} />
      <ProFormText label="邮箱" name="email" width="sm" rules={[CommonRule.email]} />
      {isNew && <ProFormText.Password label="密码" name="password" width="sm" />}

      <EleStatus />
      <RemoteRadioGroup
        label="性别"
        name="gender"
        types="GenderType"
        rules={[CommonRule.required]}
      />
    </BaseForm>
  );
};

export default EditForm;

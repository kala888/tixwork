import EleStatus from '@/components/form/fields/ele-status';
import RemoteRadio from '@/components/form/remote/remote-radio';
import DeptSelector from '@/components/tree/dept-selector';
import { CommonRule } from '@/components/value-type/common-column';
import ProMobile from '@/components/value-type/mobile/pro-mobile';
import ApiConfig from '@/http/api-config';
import Q from '@/http/http-request/q';
import { ProFormGroup, ProFormSelect, ProFormText } from '@ant-design/pro-components';

async function getPostOptions() {
  const resp = await Q.get(ApiConfig.getPostOptions);
  return resp?.data?.map((it) => ({ label: it.postName, value: it.id }));
}

async function getRoleOptions() {
  const resp = await Q.get(ApiConfig.getRoleOptions);
  return resp?.data?.map((it) => ({ label: it.roleName, value: it.id }));
}

export default function () {
  // const isNew = ObjectUtils.isEmpty(props.values?.userId);
  return (
    <ProFormGroup>
      <ProFormText label="账号" name="userName" width="sm" rules={[CommonRule.required]} />
      <ProFormText label="名称" name="nickName" width="sm" rules={[CommonRule.required]} />
      <ProFormText label="ID" name="userId" width="sm" hidden />

      <DeptSelector label="部门" name="deptId" width="sm" />

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
      {/*{isNew && <ProFormText.Password label="密码" name="password" width="sm" />}*/}

      <EleStatus label="状态" name="status" />
      <RemoteRadio label="性别" name="gender" types="GenderType" rules={[CommonRule.required]} />
    </ProFormGroup>
  );
}

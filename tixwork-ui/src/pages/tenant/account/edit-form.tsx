import ProEditForm from '@/components/form/pro-edit-form';
import RemoteRadio from '@/components/form/remote/remote-radio';
import RemoteSelect from '@/components/form/remote/remote-select';
import { CommonRule } from '@/components/value-type/common-column';
import ProMobile from '@/components/value-type/mobile/pro-mobile';
import ApiConfig from '@/http/api-config';
import ObjectUtils from '@/utils/object-utils';
import { ProFormDigit, ProFormGroup, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { ProFormDatePicker } from '@ant-design/pro-form/lib';

export default function EditForm(props) {
  const values = {
    accountCount: 0,
    status: 'ENABLED',
    ...(props.values || {}),
  };
  const title = ObjectUtils.isEmpty(values.id) ? '新增租户' : '更新租户-' + values.tenantId;
  return (
    <ProEditForm {...props} values={values} size={'large'} title={title}>
      {ObjectUtils.isEmpty(values.id) && (
        <ProFormGroup>
          <ProFormText name="userName" label="账号" rules={[CommonRule.required]} width="md" />
          <ProFormText.Password name="password" label="密码" rules={[CommonRule.required]} width="md" />
        </ProFormGroup>
      )}

      <ProFormGroup>
        <ProFormText
          name="companyName"
          label="企业名称"
          rules={[CommonRule.required, { max: 50, message: '最大长度不能超过50' }]}
          width="md"
        />
        <ProFormText
          name="creditCode"
          label="企业信用代码"
          rules={[CommonRule.required, { max: 30, message: '最大长度不能超过30' }]}
          width="md"
        />
      </ProFormGroup>
      <ProFormGroup>
        <ProFormText
          name="contactUserName"
          label="联系人"
          rules={[CommonRule.required, { max: 20, message: '最大长度不能超过20' }]}
          width={150}
        />
        <ProMobile
          name="contactMobile"
          label="联系方式"
          rules={[CommonRule.required, { max: 20, message: '最大长度不能超过20' }]}
          width={150}
        />
        <ProFormText name="address" label="地址" rules={[{ max: 200, message: '最大长度不能超过200' }]} width="md" />
      </ProFormGroup>

      <ProFormTextArea
        name="intro"
        label="企业简介"
        rules={[{ max: 200, message: '最大长度不能超过200' }]}
        width={1024}
      />

      <ProFormGroup>
        <ProFormText
          name="domain"
          label="绑定域名"
          rules={[CommonRule.required, { max: 200, message: '最大长度不能超过200' }]}
          width="md"
        />
        <RemoteSelect
          name="packageId"
          label="套餐"
          linkToUrl={ApiConfig.tenantPackage + '/list'}
          width="md"
          rules={[CommonRule.required]}
        />
        <ProFormDigit name="accountCount" label="用户数量" width="sm" rules={[CommonRule.required]} />
        <ProFormDatePicker name="expireTime" label="过期时间" rules={[CommonRule.required]} width="sm" />
        <RemoteRadio
          label="状态"
          name="status"
          allowClear={false}
          linkToUrl={'/api/options/sys.status'}
          rules={[CommonRule.required]}
          width="sm"
        />
      </ProFormGroup>
    </ProEditForm>
  );
}

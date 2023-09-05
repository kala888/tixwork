import ApiConfig from '@/http/api-config';
import Q from '@/http/http-request/q';
import { ModalForm, ProFormField, ProFormText } from '@ant-design/pro-components';
import { App } from 'antd';

type ResetPasswordType = {
  trigger: any;
};
export default function ResetPassword(props: ResetPasswordType) {
  const { notification } = App.useApp();
  const trigger = props.trigger || <a key="changePassword">重置密码</a>;

  const handleSubmit = async (values) => {
    const resp = await Q.put(ApiConfig.updatePassword, values, { asParams: true });
    if (resp.code === 200) {
      notification.success({ message: '密码已更新' });
      return true;
    }
    notification.error({ message: '密码更新失败' });
    return false;
  };

  return (
    <ModalForm
      title="重置密码"
      trigger={trigger}
      autoFocusFirstInput
      width={400}
      onFinish={handleSubmit}
      modalProps={{
        maskClosable: false,
      }}
    >
      <ProFormField label="新密码">
        <ProFormText.Password
          name="password1"
          rules={[
            {
              required: true,
              message: '密码不能为空',
            },
          ]}
        />
      </ProFormField>
      <ProFormField label="确认密码">
        <ProFormText.Password
          name="password2"
          rules={[
            {
              required: true,
              message: '确认密码不能为空',
            },
          ]}
        />
      </ProFormField>
    </ModalForm>
  );
}

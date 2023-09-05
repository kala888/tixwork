import { ModalForm, ProFormField, ProFormText } from '@ant-design/pro-components';
import { App } from 'antd';

type ResetPasswordType = {
  title: string;
  onSubmit: (values: any) => Promise<boolean>;
};
export default function ChangePassword(props: ResetPasswordType) {
  const { notification } = App.useApp();
  const { title = '修改密码', onSubmit } = props;

  const handleSubmit = async (values) => {
    if (values.password1 !== values.password2) {
      notification.error({ message: '两次输入的密码不一致' });
      return false;
    }

    if (onSubmit) {
      const success = await onSubmit(values);
      if (success) {
        notification.success({ message: '密码已更新' });
        return true;
      }
    }

    notification.error({ message: '密码更新失败' });
    return false;
  };

  return (
    <ModalForm
      title="修改密码"
      trigger={<a key="changePassword">{title}</a>}
      autoFocusFirstInput
      width={400}
      onFinish={handleSubmit}
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

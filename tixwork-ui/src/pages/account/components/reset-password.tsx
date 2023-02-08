import ApiConfig from '@/http/api-config';
import Q from '@/http/http-request/q';
import { ModalForm, ProFormField, ProFormText } from '@ant-design/pro-components';
import { notification } from 'antd';

export default function ResetPassword(props) {
  const handleSubmit = async (values) => {
    if (values.newPassword !== values.newPassword2) {
      notification.error({ message: '两次输入的密码不一致' });
      return false;
    }

    const resp = await Q.post(ApiConfig.updatePassword, values, { asParams: true });
    if (resp.code === 200) {
      notification.success({ message: '密码已更新' });
      if (props.onSuccess) {
        props.onSuccess();
      }
      return true;
    }
    notification.error({ message: '密码更新失败' });
    return false;
  };

  return (
    <ModalForm
      title="重置密码"
      trigger={<a>修改</a>}
      autoFocusFirstInput
      width={400}
      onFinish={handleSubmit}
      modalProps={{ maskClosable: false }}
    >
      <ProFormField label="旧密码">
        <ProFormText.Password
          name="oldPassword"
          rules={[
            {
              required: true,
              message: '旧密码不能为空',
            },
          ]}
        />
      </ProFormField>

      <ProFormField label="新密码">
        <ProFormText.Password
          name="newPassword"
          rules={[
            {
              required: true,
              message: '新密码不能为空',
            },
          ]}
        />
      </ProFormField>
      <ProFormField label="新密码确认">
        <ProFormText.Password
          name="newPassword2"
          rules={[
            {
              required: true,
              message: '新密码确认不能为空',
            },
          ]}
        />
      </ProFormField>
    </ModalForm>
  );
}

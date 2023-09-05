import { CommonRule } from '@/components/value-type/common-column';
import ApiConfig from '@/http/api-config';
import type { API } from '@/http/api-types';
import Q from '@/http/http-request/q';
import ObjectUtils from '@/utils/object-utils';
import { LockOutlined, MobileOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProFormCaptcha, ProFormText } from '@ant-design/pro-components';
import { App } from 'antd';
import _ from 'lodash';
import { useRef } from 'react';

export default function BindMobile(props) {
  const { message } = App.useApp();
  const formRef = useRef<ProFormInstance>();

  const handleSubmit = async (values) => {
    const resp = await Q.post<API.Toast>(ApiConfig.updateMobile, values, { asParams: true });
    if (resp.code === 200) {
      message.success('保存成功');
      if (props.onSuccess) {
        props.onSuccess();
      }
      return true;
    }
    return false;
  };

  const handleGetVerifyCode = async (mobile) => {
    const resp = await Q.get<API.Toast>(ApiConfig.getMobileVerifyCode, { mobile });
    const txt = _.get(resp, 'data.toast.text', '');
    const code = _.get(txt.match(/验证码(\d{6})/), 1);
    if (ObjectUtils.isNotEmpty(code)) {
      formRef.current?.setFieldsValue({ code });
    }
  };

  return (
    <ModalForm
      title="绑定手机号"
      trigger={<a>修改</a>}
      autoFocusFirstInput
      width={300}
      onFinish={handleSubmit}
      formRef={formRef}
    >
      <ProFormText
        width="sm"
        fieldProps={{
          prefix: <MobileOutlined />,
        }}
        name="mobile"
        placeholder="请输入手机号"
        rules={[CommonRule.required, CommonRule.mobile]}
      />
      <ProFormCaptcha
        width="sm"
        name="code"
        fieldProps={{ prefix: <LockOutlined /> }}
        placeholder="请输入验证码"
        phoneName="mobile"
        captchaTextRender={(timing, count) => {
          if (timing) {
            return `${count} 获取验证码}`;
          }
          return '获取验证码';
        }}
        rules={[CommonRule.required]}
        onGetCaptcha={handleGetVerifyCode}
      />
    </ModalForm>
  );
}

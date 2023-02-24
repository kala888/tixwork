import ActionIcon from '@/components/elements/action-icon';
import { KeyOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { ProForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { history, Link } from '@umijs/max';
import type { FormInstance } from 'antd';
import { Alert, message } from 'antd';
import { parse } from 'querystring';
import React, { useEffect, useRef, useState } from 'react';

import BizSchema from '@/biz-model/biz-schema';
import ApiConfig from '@/http/api-config';
import Q from '@/http/http-request/q';
import useProfile from '@/services/use-profile';
import { useLoading } from '@/services/use-service';
import { isNotEmpty } from '@/utils/object-utils';

import LoginFooter from './login-footer';
import QrCodeLogin from './qr-code-login';
import styles from './styles.less';

const LoginMessage: React.FC<{ content: string }> = ({ content }) => (
  <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
);

const defaultCaptcha =
  'PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjM3MDMyMjUzOTM3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI0NTQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNzE2LjggMTgwLjhMNzQ0IDEyOEgzMjB2NDQ4aDEuNnpNMTQxLjYgODQ3LjJsNDUuNiA0NS42TDQ0OCA2MzEuMlY5NjBsMjk2LTUxMkg2MzEuMmwyNjkuNi0yNjguOC00NS42LTQ1LjYiIHAtaWQ9IjI0NTUiPjwvcGF0aD48L3N2Zz4=';

type LoginMethodType = 'account' | 'qr-code';

const Login: React.FC = () => {
  const formRef = useRef<FormInstance>();
  const [captcha, setCaptcha] = useState<API.CaptchaImage>();
  const [loginTips, setLoginTips] = useState<string>();
  const [type, setType] = useState<LoginMethodType>('account');
  const { syncProfile } = useProfile();
  const { showLoading, hideLoading, loading } = useLoading();

  const refreshCaptcha = async () => {
    const res = await Q.get<API.CaptchaImage>(ApiConfig.getCaptchaImage);
    setCaptcha(res.data);
  };

  useEffect(() => {
    refreshCaptcha().then();
  }, []);

  const handleEnter = () => formRef.current!.submit();

  const handleSubmit = async (values: API.LoginParams) => {
    showLoading();
    try {
      // 登录
      const params = { ...values, uuid: captcha?.uuid };
      const resp = await Q.post<API.LoginResult>(ApiConfig.login, { ...params, type });

      if (resp.code === 200) {
        localStorage.setItem('token', resp.data.token);
        message.success('登录成功');
        await syncProfile(); //更新本地信息
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const query = parse(history.location.search);
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/');
        return;
      }
      setLoginTips(resp.msg);
    } catch (error) {
      // @ts-ignore
      setLoginTips(error?.data?.msg);
      message.error('登录失败，请重试！');
      await refreshCaptcha();
    } finally {
      hideLoading();
    }
  };

  const switchLoginType = () => {
    setType((pre) => (pre === 'account' ? 'qr-code' : 'account'));
  };
  const showCaptcha = !!captcha?.uuid;

  const brief = BizSchema?.Root?.brief || '一套数据驱动的普通脚手架';
  const logo = BizSchema?.Root?.logo || '/logo.svg';
  const system = BizSchema?.Root?.title || 'Tixwork';

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.brand}>
          <Link to="/" className={styles.brandHeader}>
            <img alt="logo" className={styles.brandLogo} src={logo} />
            <span className={styles.brandTitle}>{system}</span>
          </Link>
          <div className={styles.brandBrief}>{brief}</div>
        </div>
        <div className={styles.loginForm}>
          <ActionIcon
            className={styles.loginMethodIcon}
            icon={type === 'account' ? 'qr-code-half' : 'corner-desktop'}
            onClick={switchLoginType}
          />
          <ProForm
            formRef={formRef}
            initialValues={{ rememberMe: true }}
            size={'large'}
            submitter={{
              searchConfig: {
                submitText: '登录',
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: loading,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async (values) => {
              await handleSubmit(values as API.LoginParams);
            }}
          >
            {isNotEmpty(loginTips) && <LoginMessage content={loginTips || '登录异常'} />}

            {type === 'account' && (
              <>
                <div className={styles.loginMethod}>用户登录</div>
                <ProFormText
                  name="username"
                  fieldProps={{
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={'用户名'}
                  rules={[
                    {
                      required: true,
                      message: '请输入用户名!',
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    onPressEnter: handleEnter,
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={'密码'}
                  rules={[
                    {
                      required: true,
                      message: '请输入密码！',
                    },
                  ]}
                />
                {showCaptcha && (
                  <div className={styles.captcha}>
                    <ProFormText
                      name="code"
                      fieldProps={{
                        prefix: <KeyOutlined className={styles.prefixIcon} />,
                        onPressEnter: handleEnter,
                      }}
                      placeholder={'验证码'}
                      rules={[{ required: true, message: '请输入验证码!' }]}
                    />
                    <div className={styles.captchaImage}>
                      <img
                        src={`data:image/gif;base64,${
                          captcha?.img ? captcha?.img : defaultCaptcha
                        }`}
                        onClick={refreshCaptcha}
                        alt="验证码"
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            {type === 'qr-code' && <QrCodeLogin />}

            <div style={{ marginBottom: 24 }}>
              <ProFormCheckbox noStyle name="rememberMe">
                自动登录
              </ProFormCheckbox>
              <a style={{ float: 'right' }}>忘记密码</a>
            </div>
          </ProForm>
          {/*<Space className={styles.other}>*/}
          {/*  其他登录方式*/}
          {/*  <WechatFilled className={styles.icon} onClick={() => setType('qr-code')}/>*/}
          {/*</Space>*/}
        </div>
      </div>
      <LoginFooter />
    </div>
  );
};

export default Login;

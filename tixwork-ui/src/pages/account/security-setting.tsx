import BindMobile from '@/pages/account/components/bind-mobile';
import useProfile from '@/services/use-profile';
import { WechatOutlined } from '@ant-design/icons';
import AccountActions from './components/account-actions';
import ResetPassword from './components/reset-password';
import styles from './styles.less';

const passwordStrength = {
  strong: <span className="strong">强</span>,
  medium: <span className="medium">中</span>,
  weak: <span className="weak">弱 Weak</span>,
};

const SecuritySetting = () => {
  const { profile, syncProfile } = useProfile();
  const { user } = profile;

  const handleBindWechat = () => {
    console.log('绑定微信');
  };

  const dataSource = [
    {
      title: '账户密码',
      description: <>当前密码强度：{passwordStrength.strong}</>,
      actions: [<ResetPassword key="changePassword" onSuccess={syncProfile} />],
    },
    {
      title: '密保手机',
      description: `已绑定手机：${user?.mobile || '***********'}`,
      actions: [<BindMobile key="changeMobile" onSuccess={syncProfile} />],
    },
    {
      title: '绑定微信',
      description: '当前未绑定微信',
      actions: [
        <a key="bindWechat" onClick={handleBindWechat}>
          绑定
        </a>,
      ],
      avatar: <WechatOutlined className={styles.wechat} />,
    },
  ];

  return <AccountActions dataSource={dataSource} />;
};

export default SecuritySetting;

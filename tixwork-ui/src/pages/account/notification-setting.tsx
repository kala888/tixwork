import { Switch } from 'antd';
import AccountActions from './components/account-actions';

const NotificationSetting = (props) => {
  const { user } = props;
  const Action = <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={user} />;
  const dataSource = [
    {
      title: '系统消息',
      description: '系统消息将以站内信的形式通知',
      actions: [Action],
    },
    {
      title: '待办任务',
      description: '待办任务将以站内信的形式通知',
      actions: [Action],
    },
  ];

  return <AccountActions itemLayout="horizontal" dataSource={dataSource} />;
};

export default NotificationSetting;

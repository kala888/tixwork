import logo from '@/assets/logo.svg';
import useProfile from '@/services/use-profile';
import { ProCard } from '@ant-design/pro-components';
import { Avatar } from 'antd';
import styles from './styles.less';

export default function DashboardInfo() {
  const { profile } = useProfile();
  const { user, postGroup, roleGroup } = profile;

  return (
    <ProCard className={styles.dashboardInfo} bordered direction="row">
      <div className={styles.avatar}>
        <Avatar size="large" src={user?.avatar || logo} />
      </div>

      <ProCard className={styles.content} ghost>
        <div className={styles.contentTitle}>{user?.userName}</div>
        <div>
          {user?.dept?.name} / {postGroup} |{roleGroup}
        </div>
      </ProCard>
    </ProCard>
  );
}

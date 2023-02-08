import useProfile from '@/services/use-profile';
import { ProCard } from '@ant-design/pro-components';
import { Avatar } from 'antd';
import styles from './styles.less';
import logo from '@/assets/logo.svg';

export default function UserInfo() {
  const { profile } = useProfile();
  const { user, postGroup, roleGroup } = profile;

  return (
    <ProCard className={styles.userInfo} bordered direction="row">
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

import { useModel } from '@@/plugin-model';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { ProBreadcrumb } from '@ant-design/pro-components';
import { Space } from 'antd';
import _ from 'lodash';
import styles from './styles.less';

export default function HeaderContent() {
  const { initialState, setInitialState } = useModel<any>('@@initialState');
  const collapsed = _.get(initialState, 'layout.collapsed', true);
  const handleToggle = () => {
    setInitialState((pre) => {
      // @ts-ignore
      const { layout = {} } = pre;
      return {
        ...pre,
        layout: {
          ...layout,
          collapsed: !layout.collapsed,
        },
      };
    }).then();
  };

  return (
    <Space className={styles.headerContent}>
      <Space className={styles.switchIcon} onClick={handleToggle}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Space>
      <ProBreadcrumb />
    </Space>
  );
}

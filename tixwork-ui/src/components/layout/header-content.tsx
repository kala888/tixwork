import { useModel } from '@@/plugin-model';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { ProBreadcrumb } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Space } from 'antd';
import _ from 'lodash';

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
  const css = useEmotionCss(({ token }) => ({
    color: token.colorPrimary,
    fontSize: 20,
    cursor: 'pointer',
  }));

  return (
    <Space>
      <Space className={css} onClick={handleToggle}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Space>
      <ProBreadcrumb />
    </Space>
  );
}

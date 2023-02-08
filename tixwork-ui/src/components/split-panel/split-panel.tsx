import { useVisible } from '@/services/use-service';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Layout, Spin } from 'antd';
import classNames from 'classnames';
import styles from './styles.less';

type SplitPanelType = {
  renderLeft?: () => JSX.Element;
  children?: any;
  style?: any;
  loading?: boolean;
  leftWidth?: number | string;
  [key: string]: any;
};

export default function SplitPanel(props: SplitPanelType) {
  const { visible, toggle } = useVisible();
  const { renderLeft, children, loading = false, style, leftWidth = 200, ...rest } = props;

  const left = renderLeft ? renderLeft() : children[0];
  const right = renderLeft ? children : children[1];

  // width={200}
  const rootClass = classNames(styles.container, style);

  return (
    <div className={rootClass} {...rest}>
      <Layout>
        <Layout.Sider
          collapsed={visible}
          collapsedWidth={0}
          width={leftWidth}
          theme="light"
          collapsible
          trigger={null}
          zeroWidthTriggerStyle={{ padding: 0 }}
        >
          {left}
          <div className={styles.trigger} onClick={toggle}>
            {visible ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
          </div>
        </Layout.Sider>
        <Layout.Content style={{ backgroundColor: '#fff', minHeight: '100%' }}>
          <Spin spinning={loading}>{right}</Spin>
        </Layout.Content>
      </Layout>
    </div>
  );
}

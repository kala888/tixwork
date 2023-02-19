import { useVisible } from '@/services/use-service';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Layout, Spin } from 'antd';
import classNames from 'classnames';
import styles from './styles.less';

type SplitCardType = {
  renderLeft?: () => JSX.Element;
  children?: any;
  style?: any;
  loading?: boolean;
  leftWidth?: number | string;
  [key: string]: any;
};

export default function SplitCard(props: SplitCardType) {
  const { visible, toggle } = useVisible();
  const { renderLeft, children, loading = false, style, leftWidth = 200, ...rest } = props;

  const left = renderLeft ? renderLeft() : children[0];
  const right = renderLeft ? children : children[1];

  // width={200}
  const rootClass = classNames('split-card', styles.splitCard, style, {
    [styles.expanded]: visible,
  });

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
          className={styles.left}
        >
          {left}
          <div className={styles.trigger} onClick={toggle}>
            {visible ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
          </div>
        </Layout.Sider>
        <Layout.Content className={styles.right}>
          <Spin spinning={loading}>{right}</Spin>
        </Layout.Content>
      </Layout>
    </div>
  );
}

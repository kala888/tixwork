import { useOpen } from '@/services/use-service';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Layout, Spin } from 'antd';
import classNames from 'classnames';
import React from 'react';
import styles from './styles.less';

type SplitCardType = {
  children?: any;
  loading?: boolean;
  sliderWidth?: number | string;
  direction?: 'left' | 'right';
  style?: any;
  collapsed?: boolean;
};

type WrapByAsContentType = {
  loading: boolean;
  className: any;
  children: any;
};
const WrapByAsContent = (props: WrapByAsContentType) => {
  const { className, loading } = props;
  const cls = classNames(styles.splitCardContent, className);
  return (
    <Layout.Content className={cls}>
      <Spin spinning={loading}>{props.children}</Spin>
    </Layout.Content>
  );
};

type WrapAsSliderType = {
  visible: boolean;
  collapseToLeft: boolean;
  width: number | string;
  className: any;
  children: any;
  toggle: () => void;
};
const WrapAsSlider = (props: WrapAsSliderType) => {
  const cls = classNames(styles.splitCardSlider, props.className);
  const { visible, collapseToLeft, width, toggle } = props;
  return (
    <Layout.Sider
      collapsed={visible}
      collapsedWidth={0}
      theme="light"
      collapsible
      trigger={null}
      zeroWidthTriggerStyle={{ padding: 0 }}
      className={cls}
      width={width}
    >
      {props.children}
      <div className={styles.trigger} onClick={toggle}>
        {visible === collapseToLeft ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
      </div>
    </Layout.Sider>
  );
};

function SplitCard(props: SplitCardType) {
  const { collapsed, children, loading = false, sliderWidth = 250, direction = 'left', style } = props;
  const { open, toggle } = useOpen(collapsed);
  if (React.Children.count(children) <= 1) {
    return children;
  }

  const collapseToLeft = direction === 'left';

  // width={200}
  const rootClass = classNames('split-card', styles.splitCard, {
    [styles.collapseToRight]: !collapseToLeft,
    [styles.expanded]: open,
  });

  const left = children[0];
  const right = React.Children.map(children, (it, idx) => idx > 0 && it);
  if (collapseToLeft) {
    return (
      <div className={rootClass} style={style}>
        <Layout>
          <WrapAsSlider
            className={styles.left}
            width={sliderWidth}
            collapseToLeft={collapseToLeft}
            visible={open}
            toggle={toggle}
          >
            {left}
          </WrapAsSlider>
          <WrapByAsContent loading={loading} className={styles.right}>
            {right}
          </WrapByAsContent>
        </Layout>
      </div>
    );
  }

  return (
    <div className={rootClass} style={style}>
      <Layout>
        <WrapByAsContent loading={loading} className={styles.left}>
          {left}
        </WrapByAsContent>
        <WrapAsSlider
          className={styles.right}
          width={sliderWidth}
          collapseToLeft={collapseToLeft}
          visible={open}
          toggle={toggle}
        >
          {right}
        </WrapAsSlider>
      </Layout>
    </div>
  );
}

SplitCard.isCard = true;
export default SplitCard;

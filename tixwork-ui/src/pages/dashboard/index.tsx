import BizSchema from '@/biz-models/biz-schema';
import type { API } from '@/http/api-types';
import { useGet } from '@/http/use-http';
import ObjectUtils from '@/utils/object-utils';
import { FullscreenOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { useFullscreen } from 'ahooks';
import { Col, Empty, Row } from 'antd';
import classNames from 'classnames';
import 'rc-texty/assets/index.css';
import { useRef } from 'react';
import RemoteChart from './components/remote-chart';
import styles from './styles.less';

const Dashboard = () => {
  const ref = useRef(null);
  const [isFullscreen, { enterFullscreen }] = useFullscreen(ref);

  const contentCls = classNames(styles.content, {
    [styles.contentFullscreen]: isFullscreen,
  });

  const { data } = useGet<API.Screen>('/api/screen/dashboard/info');
  if (ObjectUtils.isEmpty(data?.title)) {
    return <Empty description={'工作台未定义'} />;
  }

  const rootCls = classNames(styles.dashboard, 'dashboard-page');
  return (
    <div className={rootCls}>
      {/*<DashboardInfo />*/}
      <ProCard
        title={data?.title}
        bordered={false}
        className={styles.chart}
        extra={<FullscreenOutlined onClick={enterFullscreen} />}
      >
        <div className={contentCls} ref={ref}>
          <div className={styles.contentHeader}>{BizSchema?.Root?.title}</div>
          <Row className={styles.row1}>
            <Col span={12}>
              <RemoteChart linkToUrl={'/api/screen/dashboard/slot1'} />
            </Col>
            <Col span={12}>
              <RemoteChart linkToUrl={'/api/screen/dashboard/slot2'} />
            </Col>
          </Row>
          <Row className={styles.row2}>
            <RemoteChart linkToUrl={'/api/screen/dashboard/slot3'} />
          </Row>
          <Row className={styles.row3}>
            <RemoteChart linkToUrl={'/api/screen/dashboard/slot4'} />
          </Row>
        </div>
      </ProCard>
    </div>
  );
};

export default Dashboard;

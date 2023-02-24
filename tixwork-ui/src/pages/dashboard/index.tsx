import BizSchema from '@/biz-model/biz-schema';
import { useGet } from '@/http';
import { isEmpty } from '@/utils/object-utils';
import { FullscreenOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Col, Empty, Row } from 'antd';
import classNames from 'classnames';
import 'rc-texty/assets/index.css';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import DashboardInfo from './components/dashboard-info';
import RemoteChart from './components/remote-chart';
import styles from './styles.less';

const Dashboard = () => {
  const handle = useFullScreenHandle();

  const contentCls = classNames(styles.content, {
    [styles.contentFullscreen]: handle.active,
  });

  const { data } = useGet<API.Screen>('/api/screen/dashboard/info');
  if (isEmpty(data?.title)) {
    return <Empty description={'工作台未定义'} />;
  }

  return (
    <div className={styles.dashboard}>
      <DashboardInfo />
      <ProCard
        title={data?.title}
        bordered={false}
        className={styles.chart}
        extra={<FullscreenOutlined onClick={handle.enter} />}
      >
        <FullScreen handle={handle}>
          <div className={contentCls}>
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
        </FullScreen>
      </ProCard>
    </div>
  );
};

export default Dashboard;

import BizSchema from '@/biz-model/biz-schema';
import Q from '@/http/http-request/q';
import SlotCard from '@/pages/dashboard/components/slot-card';
import StatusChart from '@/pages/dashboard/components/status-chart';
import VisitTimesChart from '@/pages/dashboard/components/visit-times-chart';
import { ProCard, ProForm, ProFormDateRangePicker } from '@ant-design/pro-components';
import { Col, notification, Row } from 'antd';
import classNames from 'classnames';
import moment from 'moment';
import 'rc-texty/assets/index.css';
import { useEffect, useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import DashboardInfo from './components/dashboard-info';
import styles from './styles.less';

type StateType = {
  totalInvestment: number;
  totalTimes: number;
  startDate?: any;
  endDate?: any;
  processStatusList: {
    title: string;
    value: number;
  };
  visitTimesList: {
    title: string;
    value: number;
  };
};

const Dashboard = () => {
  const handle = useFullScreenHandle();
  const [state, setState] = useState<StateType>({} as any);
  const defaultStartDate = moment().month(moment().month()).startOf('month').valueOf();
  const defaultEndDate = moment().month(moment().month()).endOf('month').valueOf();

  useEffect(() => {
    Q.post<StateType>('/api/dashboard/report', {
      startDate: defaultStartDate,
      endDate: defaultEndDate,
    }).then((resp) => {
      setState({
        ...resp.data,
      });
    });
  }, []);

  const contentCls = classNames(styles.content, {
    [styles.contentFullscreen]: handle.active,
  });

  const handleSearch = async (values) => {
    const [startDate, endDate] = values.dateRange || [];
    const diff = moment(endDate).diff(moment(startDate), 'day');
    if (diff > 92) {
      notification.error({ message: '查询区间不大于三个月（92天）' });
      return;
    }
    Q.post<StateType>('/api/dashboard/report', { startDate, endDate }).then((resp) => {
      setState(resp.data);
    });
  };

  const title = (
    <Row gutter={[40, 16]}>
      <Col>项目统计</Col>
      <Col>
        <ProForm
          onFinish={handleSearch}
          initialValues={{
            dateRange: [defaultStartDate, defaultEndDate],
          }}
          layout={'inline'}
          submitter={{
            resetButtonProps: {
              style: {
                display: 'none',
              },
            },
            searchConfig: {
              submitText: '搜索',
            },
          }}
        >
          <ProFormDateRangePicker name={'dateRange'} allowClear={false} />
        </ProForm>
      </Col>
    </Row>
  );

  return (
    <div className={styles.dashboard}>
      <DashboardInfo />
      <ProCard bordered={false} title={title} className={styles.chart}>
        <FullScreen handle={handle}>
          <div className={contentCls}>
            <div className={styles.contentHeader}>{BizSchema?.Root?.title}</div>
            <Row className={styles.row1}>
              <Col span={12}>
                <SlotCard title="项目金额" brief="亿元" value={state.totalInvestment} />
              </Col>
              <Col span={12}>
                <SlotCard title="拜访次数" brief="次" value={state.totalTimes} />
              </Col>
            </Row>
            <Row className={styles.row2}>
              <StatusChart items={state.processStatusList} />
            </Row>
            <Row className={styles.row3}>
              <VisitTimesChart items={state.visitTimesList} />
            </Row>
          </div>
        </FullScreen>
      </ProCard>
    </div>
  );
};

export default Dashboard;

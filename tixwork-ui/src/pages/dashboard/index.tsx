import { Col, notification, Row, Statistic } from 'antd';
import Texty from 'rc-texty';
import numeral from 'numeral';
import { ProFormDateRangePicker } from '@ant-design/pro-form';
import { ProCard, ProForm } from '@ant-design/pro-components';
import moment from 'moment';
import 'rc-texty/assets/index.css';
import { useEffect, useState } from 'react';
import Q from '@/http/http-request/q';
import StatusChart from '@/pages/dashboard/components/status-chart';
import VisitTimesChart from '@/pages/dashboard/components/visit-times-chart';
import UserInfo from '@/pages/dashboard/components/user-info';
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

  // //获取本周
  //   const startDate = moment().week(moment().week()).startOf('week').format('YYYY-MM-DD');   //这样是年月日的格式
  //   const endDate = moment().week(moment().week()).endOf('week').valueOf(); //这样是时间戳的格式
  //获取本月

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

  const { totalInvestment = '', totalTimes = '' } = state;

  return (
    <div className={styles.dashboard}>
      <UserInfo />
      <ProCard title={title} bordered={false} className={styles.chart}>
        <Row>
          <Col span={12}>
            <Statistic
              title="项目金额"
              valueRender={() => (
                <Texty delay={300}>{`${numeral(totalInvestment).format('0,0')}亿元`}</Texty>
              )}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="拜访次数"
              valueRender={() => (
                <Texty delay={300}>{`${numeral(totalTimes).format('0,0')}次`}</Texty>
              )}
            />
          </Col>
        </Row>
        <Row className={styles.chartContent}>
          <StatusChart items={state.processStatusList} />
          <VisitTimesChart items={state.visitTimesList} />
        </Row>
      </ProCard>
    </div>
  );
};

export default Dashboard;

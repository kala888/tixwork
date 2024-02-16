import Q from '@/http/http-request/q';
import { getChartOption } from '@/pages/dashboard/components/option-utils';
import SlotCard from '@/pages/dashboard/components/slot-card';
import SlotNotSupport from '@/pages/dashboard/components/slot-not-support';
import SlotTable from '@/pages/dashboard/components/slot-table';
import { useRequest } from 'ahooks';
import ReactECharts from 'echarts-for-react';
import _ from 'lodash';
import { useEffect, useRef } from 'react';

type RemoteChartType = {
  title?: any;
  brief?: any;
  linkToUrl?: any;
  interval?: any;
  options?: any;
};
export type ChartSlotType = {
  title: string;
  brief: string;
  value: any;
  type?: 'TABLE' | 'CARD' | 'BAR' | 'PIE' | 'ROSE' | 'LINE' | 'NOT_SUPPORT';
};
export default function RemoteChart(props: RemoteChartType) {
  const { title, linkToUrl, interval, ...rest } = props;
  const fetch = async () => await Q.get<ChartSlotType>(linkToUrl);
  const resp = useRequest(fetch, {
    pollingInterval: interval,
  });
  const slot = resp.data?.data;
  const ref = useRef<any>();
  useEffect(() => {
    if (ref.current) {
      ref.current!.resize();
    }
  }, [slot]);
  if (!slot) {
    return null;
  }
  if (slot?.type === 'TABLE') {
    return <SlotTable {...rest} {...slot} />;
  }
  if (slot?.type === 'CARD') {
    return <SlotCard {...rest} {...slot} />;
  }
  if (slot?.type === 'NOT_SUPPORT') {
    return <SlotNotSupport />;
  }
  const chatOption = getChartOption({ ...rest, ...slot });
  const option = _.merge(chatOption, props?.options);
  return <ReactECharts ref={ref} option={option} style={{ height: '100%', width: '100%' }} />;
}

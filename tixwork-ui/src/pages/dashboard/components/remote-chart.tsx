import Q from '@/http/http-request/q';
import { getChartOption } from '@/pages/dashboard/components/option-utils';
import SlotCard from '@/pages/dashboard/components/slot-card';
import SlotNotSupport from '@/pages/dashboard/components/slot-not-support';
import SlotTable from '@/pages/dashboard/components/slot-table';
import { useRequest } from 'ahooks';
import ReactECharts from 'echarts-for-react';
import { useEffect, useRef } from 'react';

type RemoteChartType = {
  title?: any;
  linkToUrl?: any;
  interval?: any;
};
export type ChartSlotType = {
  title: string;
  brief: string;
  value: any;
  type?: 'TABLE' | 'CARD' | 'BAR' | 'PIE' | 'ROSE' | 'LINE' | 'NOT_SUPPORT';
};
export default function RemoteChart(props: RemoteChartType) {
  const { title, linkToUrl, interval } = props;
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
    return <SlotTable {...slot} />;
  }
  if (slot?.type === 'CARD') {
    return <SlotCard {...slot} />;
  }
  if (slot?.type === 'NOT_SUPPORT') {
    return <SlotNotSupport />;
  }
  // @ts-ignore
  const option = getChartOption({ title, ...slot });
  return <ReactECharts ref={ref} option={option} style={{ height: '100%', width: '100%' }} />;
}

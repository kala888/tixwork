import type { ChartSlotType } from '@/pages/dashboard/components/remote-chart';
import { Statistic } from 'antd';
import numeral from 'numeral';
import Texty from 'rc-texty';

export default function SlotCard(props: ChartSlotType) {
  const { title, value = '', brief } = props;
  const content = `${numeral(value).format('0,0')} ${brief}`;
  return <Statistic title={title} valueRender={() => <Texty delay={200}>{content}</Texty>} />;
}

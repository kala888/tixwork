import ObjectUtils from '@/utils/object-utils';
import { Tooltip } from 'antd';
import _ from 'lodash';

const formatTime = (seconds: number) => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const parts = _.compact([
    `${seconds}秒 = `,
    days && `${days}天`,
    hours && `${hours}小时`,
    minutes && `${minutes}分钟`,
    remainingSeconds && `${remainingSeconds}秒`,
  ]);

  return parts.length > 0 ? parts.join(' ') : '0秒';
};

export default function (props: { seconds: any }) {
  const seconds = _.toNumber(props.seconds);
  if (ObjectUtils.isEmpty(seconds) || _.isNaN(seconds)) {
    return <span>{seconds}</span>;
  }
  const title = formatTime(seconds);
  return (
    <Tooltip title={title} color="orange">
      {seconds}
    </Tooltip>
  );
}

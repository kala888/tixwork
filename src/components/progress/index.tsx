import classNames from 'classnames';
import { Text, View } from '@tarojs/components';
import './styles.less';

type ProgressType = {
  color?: string;
  status?: 'progress' | 'error' | 'success';
  percent?: number;
  strokeWidth?: number;
  isHidePercent?: boolean;
  className?: any;
};
export default function Progress(props: ProgressType) {
  const { color } = props;
  let { percent } = props;
  const { strokeWidth, status, isHidePercent } = props;

  if (typeof percent !== 'number') {
    percent = 0;
  }

  if (percent < 0) {
    percent = 0;
  } else if (percent > 100) {
    percent = 100;
  }

  const rootClass = classNames(
    'progress',
    {
      [`progress--${status}`]: !!status,
    },
    props.className
  );
  const iconClass = classNames('iconfont', {
    'iconfont-close-circle': status === 'error',
    'iconfont-check': status === 'success',
  });

  const progressStyle = {
    width: percent && `${+percent}%`,
    height: strokeWidth && `${+strokeWidth}px`,
    backgroundColor: color,
  };

  return (
    <View className={rootClass}>
      <View className='progress__outer'>
        <View className='progress__outer-inner'>
          <View className='progress__outer-inner-background' style={progressStyle} />
        </View>
      </View>

      {!isHidePercent && (
        <View className='progress__content'>
          {!status || status === 'progress' ? `${percent}%` : <Text className={iconClass}></Text>}
        </View>
      )}
    </View>
  );
}

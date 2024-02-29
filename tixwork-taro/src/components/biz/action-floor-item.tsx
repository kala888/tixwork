import ServerImage from '@/server-image/server-image';
import { Text, View } from '@tarojs/components';
import EleButton, { EleButtonProps } from '@/components/elements/ele-button';
import { getExtMode } from '@/nice-router/nice-router-utils';

import './styles.less';
import ObjectUtils from '@/utils/object-utils';

type ActionFloorItemProps = {
  color?: 'blue';
} & Omit<EleButtonProps, 'mode'>;

function ActionFloorItem(props: ActionFloorItemProps) {
  const { title, brief, imageUrl, color, ...others } = props || {};
  if (ObjectUtils.isEmpty(title) && ObjectUtils.isEmpty(brief) && ObjectUtils.isEmpty(imageUrl)) {
    return null;
  }

  const rootCls = getExtMode(color).classNames('action-floor-item');
  return (
    <EleButton {...others} mode='ghost' className={rootCls}>
      {imageUrl ? (
        <ServerImage className='action-floor-item-image' mode='scaleToFill' src={imageUrl} />
      ) : (
        <View className='action-floor-item-title'>{title}</View>
      )}
      <View className='action-floor-item-brief'>
        <Text className='action-floor-item-brief-txt'>{brief}</Text>
      </View>
    </EleButton>
  );
}

ActionFloorItem.defaultProps = {
  action: {},
};

export default ActionFloorItem;

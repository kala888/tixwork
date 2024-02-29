import { View } from '@tarojs/components';
import ActionIcon from '@/components/action-icon/action-icon';
import ObjectUtils from '@/utils/object-utils';
import ActionUtil from '@/utils/action-util';
import EleButton, { EleButtonProps } from '@/components/elements/ele-button';

import './navigation-line.less';

type NavigationLineProps = {
  secondTitle?: string;
  prefixIcon?: string;
  prefixImageUrl?: string;
} & EleButtonProps;

export default function NavigationLine(props: NavigationLineProps) {
  const { title, secondTitle, brief, icon, imageUrl, prefixIcon, prefixImageUrl, ...others } = props;

  const useDefaultPrefix = ObjectUtils.isEmpty(prefixIcon) && ObjectUtils.isEmpty(prefixImageUrl);

  const showDefaultRightIcon =
    ActionUtil.isActionLike(props) && ObjectUtils.isEmpty(icon) && ObjectUtils.isEmpty(imageUrl);
  const theAction = showDefaultRightIcon ? 'right' : icon;

  return (
    <EleButton mode='ghost' {...others}>
      <View className='navigation-line'>
        <View className='navigation-line-header'>
          {useDefaultPrefix ? (
            <View className='navigation-line-header-prefix' />
          ) : (
            <ActionIcon icon={prefixIcon} imageUrl={prefixImageUrl} />
          )}
        </View>

        <View className='navigation-line-body'>
          <View className='navigation-line-title'>{title}</View>
          <View className='navigation-line-second-title'>{secondTitle}</View>
        </View>

        <View className='navigation-line-footer'>
          <View className='navigation-line-brief'>{brief}</View>
          <ActionIcon icon={theAction} imageUrl={imageUrl} />
        </View>
      </View>
    </EleButton>
  );
}

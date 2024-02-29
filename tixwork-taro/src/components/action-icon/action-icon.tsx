import ServerImage, { ServerImageProps } from '@/server-image/server-image';
import { Text, View } from '@tarojs/components';
import classNames from 'classnames';
import { IconLike, ImageLike } from '@/nice-router/nice-router-types';

import './styles.less';
import ObjectUtils from '@/utils/object-utils';

type ActionIconProps = IconLike & ImageLike & ServerImageProps;

/**
 *  有icon，优先展示ICON
 */
export default function ActionIcon(props: ActionIconProps) {
  const { icon = '', imageUrl, className, mode, ...rest } = props;
  if (ObjectUtils.isEmpty(icon) && ObjectUtils.isEmpty(imageUrl)) {
    return null;
  }

  if (ObjectUtils.isNotEmpty(icon)) {
    const isBizFont = icon.startsWith('bizfont-');
    const rootClass = classNames(
      'iconfont',
      {
        bizfont: isBizFont,
        [icon]: isBizFont,
        [`iconfont-${icon}`]: !isBizFont,
      },
      className,
      mode
    );
    return (
      <View className='action-icon' {...rest}>
        <Text className={rootClass} />
      </View>
    );
  }

  const rootClass = classNames('action-icon', 'action-image', className);

  return (
    <View className={rootClass} {...rest}>
      <ServerImage customStyle={{ width: '100%', height: '100%' }} mode={mode} src={imageUrl} />
    </View>
  );
}

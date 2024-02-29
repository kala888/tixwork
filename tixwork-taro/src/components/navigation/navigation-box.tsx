import ActionIcon from '@/components/action-icon/action-icon';
import { getExtMode } from '@/nice-router/nice-router-utils';
import { Text, View } from '@tarojs/components';
import EleBadge from '@/components/elements/ele-badge/ele-badge';
import EleButton, { EleButtonProps } from '@/components/elements/ele-button';

import './navigation-box.less';

type NavigationBoxItem = { badge?: number } & EleButtonProps;

type NavigationBoxProps = {
  title?: string;
  icon?: any;
  onClick?: () => void;
  items: NavigationBoxItem[];
  mode?: 'round-bottom' | 'round-top';
  className?: string;
};

function NavigationBox(props: NavigationBoxProps) {
  const { title, icon, onClick, items = [], className, mode } = props;

  const rootClass = getExtMode(mode, { center: items.length <= 5 }).classNames('navigation-box', className);

  return (
    <View className={rootClass}>
      <View className='navigation-box-header' onClick={onClick}>
        <View className='navigation-box-header-title'>
          <View>{icon}</View>
          <View>{title}</View>
        </View>
        {onClick && <ActionIcon icon='right' className='click-icon' />}
      </View>
      <View className='navigation-box-actions'>
        {items.map((it) => {
          const { disabled } = it;
          const itemClass = getExtMode({ disabled }).classNames('navigation-box-item');
          return (
            <EleButton mode='ghost' key={`${it.id}_${it.code}`} className={itemClass} {...it}>
              <EleBadge value={it.badge}>
                <ActionIcon icon={it.icon} imageUrl={it.imageUrl} />
                <Text className='navigation-box-item-title'>{it.title}</Text>
              </EleBadge>
            </EleButton>
          );
        })}
      </View>
    </View>
  );
}

export default NavigationBox;

import { CoverImage, CoverView } from '@tarojs/components';
import { useState } from 'react';
import './styles.less';
import NavigationService from '@/nice-router/navigation-service';

type TabBarItemType = {
  linkToUrl: string;
  title?: string;
  icon: string;
  color?: string;
  selectedIcon?: string;
  selectedColor?: string;
};

type TabBarType = {
  current?: number;
  onClick: (index: number, selected: TabBarItemType) => void;
  items: TabBarItemType[];
  center?: TabBarItemType;
};

export default function TabBar(props: TabBarType) {
  const { current = 0, items = [], onClick, center } = props;
  const [selected, setSelected] = useState(current);

  const switchTab = (item: TabBarItemType, index) => {
    setSelected(index);
    if (onClick) {
      onClick(index, item);
      return;
    }
    NavigationService.goPage(item.linkToUrl).then();
  };
  const handleClickCenter = () => {
    NavigationService.goPage(center?.linkToUrl || '').then();
  };

  return (
    <CoverView className='tab-bar'>
      <CoverView className='tab-bar-wrap'>
        {items.map((it, idx) => {
          const { selectedColor = '#ed6c00', color = '#666' } = it;
          const theIcon: any = selected === idx ? it.selectedIcon : it.icon;
          const theColor = selected === idx ? selectedColor : color;
          return (
            <CoverView
              key={it.title}
              className='tab-bar-wrap-item'
              onClick={switchTab.bind(null, it, idx)}
              data-path={it.linkToUrl}
            >
              <CoverImage className='tab-bar-wrap-item-icon' src={theIcon} />
              <CoverView className='tab-bar-wrap-item-btn' style={{ color: theColor }}>
                {it.title}
              </CoverView>
            </CoverView>
          );
        })}
      </CoverView>
      {center && <CoverImage className='center-icon' src={center.icon} onClick={handleClickCenter} />}
    </CoverView>
  );
}

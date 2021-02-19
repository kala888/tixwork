import React, { useEffect, useState } from 'react';
import NavigationService from '@/nice-router/navigation-service';
import { LoadingType } from '@/nice-router/nice-router-util';
import { AtTabs } from 'taro-ui';
import { ActionLike } from '@/nice-router/nice-router-types';
import { TabItem } from 'taro-ui/types/tabs';

type EleTabItemProps = {
  selected?: boolean;
} & ActionLike;

export type EleTabsProps = {
  tabs?: EleTabItemProps[] & TabItem[];
};

function EleTabs(props: EleTabsProps) {
  const { tabs = [] } = props;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const selectedIdx = tabs.findIndex((it) => it.selected);
    setCurrent(selectedIdx > -1 ? selectedIdx : 0);
  }, [tabs]);

  const handleTabSwitch = (index) => {
    setCurrent(index);
    const tab = tabs[index];
    NavigationService.refresh(
      tab,
      {},
      {
        loading: LoadingType.BarLoading,
      }
    );
  };

  const scroll = tabs.length > 4;
  // key={Date.now().valueOf()} 坑，这里有个bug，把Key换一下就行了
  return (
    <AtTabs
      key={Date.now().valueOf()}
      height='50px'
      current={current}
      scroll={scroll}
      tabList={tabs}
      onClick={handleTabSwitch}
    />
  );
}

EleTabs.defaultProps = {
  tabs: [],
};
export default EleTabs;

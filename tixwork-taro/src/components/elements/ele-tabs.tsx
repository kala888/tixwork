import { useEffect, useState } from 'react';
import NavigationService from '@/nice-router/navigation-service';
import { ActionLike } from '@/nice-router/nice-router-types';
import LoadingType from '@/nice-router/loading-type';
import Tabs from '@/components/tabs';

type EleTabItemProps = {
  selected?: boolean;
} & ActionLike;

export type EleTabsProps = {
  tabs?: EleTabItemProps[];
  type?: 'scroll' | null;
};

function EleTabs(props: EleTabsProps) {
  const { tabs = [], type } = props;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const selectedIdx = tabs.findIndex((it) => it.selected);
    setCurrent(selectedIdx > -1 ? selectedIdx : 0);
  }, [tabs]);

  const handleTabSwitch = (index) => {
    setCurrent(index);
    const tab = tabs[index];
    NavigationService.send(
      tab,
      {},
      {
        loading: LoadingType.BarLoading,
        dataRefresh: true,
      }
    );
  };

  const scroll = type === 'scroll' && tabs.length > 4;
  return <Tabs key={Date.now().valueOf()} current={current} scroll={scroll} items={tabs} onClick={handleTabSwitch} />;
}

EleTabs.defaultProps = {
  tabs: [],
};
export default EleTabs;

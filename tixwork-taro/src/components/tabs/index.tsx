// tabs.jsx
import { useState } from 'react';
import { ScrollView, Text, View } from '@tarojs/components';
import './styles.less';
import classNames from 'classnames';

type TabsType = {
  items: any[];
  current?: number;
  onClick?: (index: number, item: any) => void;
  className?: any;
  children?: any;
  scroll?: boolean;
};
export default function Tabs(props: TabsType) {
  const { items = [], current = 0, onClick, className, scroll = false } = props;
  const [selected, setSelected] = useState(current);

  const handleClick = (item, index) => {
    setSelected(index);
    if (onClick) {
      onClick(index, item);
    }
  };

  const rootCls = classNames('tabs-wrap', { scroll }, className);

  const content = (
    <View className='tabs'>
      {items.map((it, index) => {
        const tabCls = classNames('tabs__item', { 'tabs__item--active': index === selected });
        const lineCls = classNames('tabs__line', { 'tabs__line--active': index === selected });
        return (
          <View key={it.title} className={tabCls} onClick={handleClick.bind(null, it, index)}>
            <Text>{it.title}</Text>
            <View className={lineCls} />
          </View>
        );
      })}
    </View>
  );

  return (
    <View className={rootCls}>
      {scroll ? <ScrollView scrollX>{content}</ScrollView> : content}
      <View className='tabContent'>{props.children}</View>
    </View>
  );
}

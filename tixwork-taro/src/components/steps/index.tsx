import { View } from '@tarojs/components';
import classNames from 'classnames';
import './styles.less';
import { useState } from 'react';
import { CandidateValue } from '@/nice-router/nice-router-types';
import Divider from '@/components/divider';
import { isNotEmpty } from '@/utils/object-utils';

type StepsType = {
  items: (CandidateValue & { icon?: any })[];
  current?: number;
  onChange?: (index: number, value: CandidateValue) => void;
};

function StepItem(props) {
  const { icon, title, iconText, active, onClick, brief } = props;
  const rootCls = classNames('step-item', {
    active,
  });
  return (
    <View className={rootCls} onClick={onClick}>
      <View className='step-item__icon'>{icon || iconText}</View>
      <View className='step-item__title'>{title}</View>
      {isNotEmpty(brief) && <View className='step-item__brief'>{brief}</View>}
    </View>
  );
}

export default function Steps(props: StepsType) {
  const { items = [], current = 0, onChange } = props;
  const [selected, setSelected] = useState(current);

  const handleChange = (item, idx) => {
    setSelected(idx);
    onChange && onChange(idx, item);
  };

  return (
    <View className='steps'>
      {items.map((it, idx) => {
        // @ts-ignore
        const key = it?.id + it?.title + idx;
        const isLast = idx === items.length - 1;
        return (
          <>
            <StepItem
              key={key}
              iconText={idx + 1}
              active={selected === idx}
              onClick={handleChange.bind(null, it, idx)}
              {...it}
            />
            {!isLast && (
              <View className='connect-line'>
                <Divider />
              </View>
            )}
          </>
        );
      })}
    </View>
  );
}

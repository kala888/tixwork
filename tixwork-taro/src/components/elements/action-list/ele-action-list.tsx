import React from 'react';
import { View } from '@tarojs/components';
import { isH5 } from '@/utils';
import _ from 'lodash';
import { getExtMode } from '@/nice-router/nice-router-utils';
import ObjectUtils from '@/utils/object-utils';
import EleButton, { EleButtonProps } from '../ele-button';
import './styles.less';

const MixClass = [
  ['mix0'],
  ['mix0', 'mix1'],
  ['mix0', 'mix05', 'mix1'],
  ['mix0', 'mix033', 'mix066', 'mix1'],
  ['mix0', 'mix025', 'mix05', 'mix075', 'mix1'],
];

export type EleActionListProps = {
  items?: EleButtonProps[];
  mode?: 'small' | 'right' | 'left' | 'full' | 'footer' | 'radius0' | 'footer-bar' | 'colorful' | string[];
  className?: string;
};

const EleActionList: React.FC<EleActionListProps> = (props) => {
  const { items = [], mode = ['full'], className } = props;
  if (ObjectUtils.isEmpty(items)) {
    return null;
  }

  const rootClass = getExtMode(mode, { h5: isH5() }).classNames('ele-action-list', className);

  const stopTheEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <View className={rootClass} onClick={stopTheEvent}>
      {items.map((action, idx) => {
        const key = `btn_${action.id}_${action.code}_${action.title}`;
        const mixColorClass = _.get(MixClass, `${items.length - 1}.${idx}`);
        const itemClass = getExtMode(mixColorClass).classNames('ele-action-list-item');
        return (
          <View key={key} className={itemClass}>
            <EleButton {...action} />
          </View>
        );
      })}
    </View>
  );
};
export default EleActionList;

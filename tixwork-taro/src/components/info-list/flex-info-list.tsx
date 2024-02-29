import FlexInfoItem, { FlexInfoItemProps } from '@/components/info-list/flex-info-item';
import SectionBar from '@/components/section-bar/section-bar';

import EleActionList from '@/components/elements/action-list/ele-action-list';
import { View } from '@tarojs/components';
import ObjectUtils from '@/utils/object-utils';
import { ActionListLike } from '@/nice-router/nice-router-types';
import './flex-info-list.less';

type FlexInfoListProps = { items: FlexInfoItemProps[] } & Partial<ActionListLike>;

/**
 * title  section 名字(optional)
 * onClick section 点击事件(optional)
 * linkToUrl section 点击是触发的action(optional)
 *
 * items FlexInfoItems（required）[{id:1,type:'longtext',value:'hello'}]
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function FlexInfoList(props: FlexInfoListProps) {
  const { items = [], actionList, ...others } = props;

  return (
    <SectionBar mode={['bordered', 'highlight']} {...others} className='flex-info-list'>
      {items.map((it, idx) => (
        <FlexInfoItem key={`the-group-item-${idx}`} {...it} />
      ))}
      {ObjectUtils.isNotEmpty(actionList) && (
        <View className='flex-info-list-actions'>
          <EleActionList mode={['small', 'right']} items={actionList} />
        </View>
      )}
    </SectionBar>
  );
}

FlexInfoList.defaultProps = {
  title: '',
  items: [],
  foldable: true,
  expand: true,
};
export default FlexInfoList;

import { Text, View } from '@tarojs/components';
import _ from 'lodash';
import classNames from 'classnames';
import { getExtMode } from '@/nice-router/nice-router-utils';
import { getGroupListByColumn } from '@/utils';
import NavigationService from '@/nice-router/navigation-service';
import { ActionLike, EleObject, IconLike, ImageLike } from '@/nice-router/nice-router-types';
import ActionIcon from '@/components/action-icon/action-icon';
import { isEmpty, isNotEmpty } from '@/utils/object-utils';
import './grid-list.less';

type GridListItemProps = ImageLike & IconLike & ActionLike & EleObject;

type GridListProps = {
  items: GridListItemProps[];
  columnNum?: number;
  onClick?: Function;
  className?: string;
};

/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function GridList(props: GridListProps) {
  const { items = [], columnNum = 3, onClick, className } = props;
  if (isEmpty(items)) {
    return null;
  }

  const groupList = getGroupListByColumn(items, columnNum);
  const handleClick = (item, index, row) => {
    if (item.onClick) {
      item.onClick();
      return;
    }
    if (_.isFunction(onClick)) {
      onClick(item, row * columnNum + index);
      return;
    }
    NavigationService.view(item);
  };

  const rootClass = classNames('grid-list', className);

  return (
    <View className={rootClass}>
      {groupList.map((row) => {
        const { list } = row;
        return (
          <View key={`row-${row.id}`} className='grid-list-row'>
            {list.map((item: GridListItemProps, idx) => {
              const { disabled, imageUrl, title = '', brief = '', icon = '' } = item;

              const bodyClass = getExtMode({
                last: idx === columnNum - 1,
                active: !disabled,
                disabled: disabled,
              }).classNames('grid-list-item');

              const itemStyle = { flex: `0 0 ${100 / columnNum}%` };
              const actionTitle = `${title}${isNotEmpty(brief) ? '\n' + brief : ''}`;

              const key = `item-${idx}-${item.id}`;
              return (
                <View key={key} className={bodyClass} style={itemStyle} onClick={handleClick.bind(this, item)}>
                  <View className='grid-list-item_icon'>
                    <ActionIcon icon={icon} imageUrl={imageUrl} />
                  </View>
                  <Text className='grid-list-item_title'>{actionTitle}</Text>
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

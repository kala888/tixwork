import NavigationService from '@/nice-router/navigation-service';
import { Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import { ActionLike, ActionListLike, IconLike, ImageLike } from '@/nice-router/nice-router-types';
import ObjectUtils from '@/utils/object-utils';
import ActionIcon from '@/components/action-icon/action-icon';
import EleButton from '@/components/elements/ele-button';

import './styles.less';

type EleMoreActionsProps = {
  text?: string;
  className?: string;
  type?: 'actionSheet' | 'link' | 'auto';
} & ActionListLike &
  ActionLike &
  ImageLike &
  IconLike;

function EleMoreActions(props: EleMoreActionsProps) {
  const { actionList = [], linkToUrl = '', type = 'auto', text, imageUrl, icon = 'chevron-right', className } = props;

  const showSheet = () => {
    const itemList = actionList.map((it) => it.title).filter((it) => ObjectUtils.isNotEmpty(it));

    Taro.showActionSheet({
      // @ts-ignore
      itemList,
      success: ({ tapIndex }) => {
        NavigationService.view(actionList[tapIndex]);
      },
    });
  };

  const onClick = () => {
    if (actionList.length === 0 && ObjectUtils.isNotEmpty(linkToUrl)) {
      NavigationService.view(linkToUrl);
      return;
    }

    if (type === 'actionSheet' || (type === 'auto' && actionList.length > 1)) {
      showSheet();
      return;
    }

    if (type === 'link' || (type === 'auto' && actionList.length === 1)) {
      NavigationService.view(actionList[0]);
    }
  };

  const rootClass = classNames('ele-more-actions', className);

  return (
    <EleButton mode='ghost' onClick={onClick} className={rootClass}>
      <Text className='ele-more-actions-txt'>{text}</Text>
      <ActionIcon icon={icon} imageUrl={imageUrl} />
    </EleButton>
  );
}

export default EleMoreActions;

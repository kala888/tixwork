import NavigationService from '@/nice-router/navigation-service';
import { Text, View } from '@tarojs/components';
import _ from 'lodash';
import classNames from 'classnames';
import { ActionLike, EleObject } from '@/nice-router/nice-router-types';
import ActionUtil from '@/utils/action-util';
import { isNotEmpty } from '@/utils/object-utils';
import './styles.less';

function InfoObjectLink(props: EleObject & ActionLike) {
  const { id, title, brief } = props;

  const onClick = _.debounce(() => {
    NavigationService.view(props, { id });
  }, 500);

  const rootClass = classNames('info-object-link', {
    clickable: ActionUtil.isActionLike(props),
  });

  return (
    <View className={rootClass} onClick={onClick}>
      <Text className='info-object-link-title'>{title}</Text>
      {isNotEmpty(brief) && <Text className='info-object-link-brief'>({brief})</Text>}
    </View>
  );
}

InfoObjectLink.defaultProps = {
  id: '',
  title: '',
  brief: '',
  linkToUrl: '',
};

export default InfoObjectLink;

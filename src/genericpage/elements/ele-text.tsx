import NavigationService from '@/nice-router/navigation-service';
import { Text } from '@tarojs/components';
import classNames from 'classnames';
import { ActionLike } from '@/nice-router/nice-router-types';

type EleTextProps = {
  text: string;
  className?: string;
} & ActionLike;

function EleText(props: EleTextProps) {
  const { text, className } = props;
  const onClick = () => NavigationService.view(props);

  const rootClass = classNames('ele-text', className);
  return (
    <Text className={rootClass} onClick={onClick}>
      {text}
    </Text>
  );
}

export default EleText;

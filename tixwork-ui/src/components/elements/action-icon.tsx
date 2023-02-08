import type { IconFontType } from '@/components/icon-font';
import IconFont from '@/components/icon-font';
import { isNotEmpty } from '@/utils/object-utils';

type ActionIconType = {
  imageUrl?: string;
} & Partial<IconFontType>;

const ActionIcon = (props: ActionIconType) => {
  const { imageUrl, ...rest } = props;
  if (isNotEmpty(imageUrl)) {
    return <img src={imageUrl} alt="img" />;
  }
  return <IconFont {...rest} />;
};

export default ActionIcon;

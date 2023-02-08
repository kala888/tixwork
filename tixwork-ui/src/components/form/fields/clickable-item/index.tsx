import StyleUtils from '@/components/value-type/style-utils';
import { isEmpty } from '@/utils/object-utils';
import type { ProFormFieldProps } from '@ant-design/pro-components';
import classNames from 'classnames';
import styles from './styles.less';

type ClickableItemType = {
  value: any;
  suffix?: any;
  onClick?: () => void;
  className?: any;
  placeholder?: string;
  width?: ProFormFieldProps['width'];
  disabled?: boolean;
  children?: any;
};

/**
 * Antd ProComponent风格的可点击组件
 */
export default function ClickableItem(props: ClickableItemType) {
  const {
    className,
    width,
    disabled,
    placeholder = '请选择',
    value,
    onClick,
    children,
    suffix,
  } = props;

  const rootCls = classNames(
    styles.clickableItem,
    className,
    StyleUtils.proFieldClass(width, disabled),
    {
      [styles.placeholder]: isEmpty(value),
    },
  );
  let title = value;
  if (!disabled && isEmpty(value)) {
    title = placeholder;
  }
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };
  return (
    <div className={rootCls} onClick={handleClick}>
      <div className={styles.content}>{children || title}</div>
      {suffix}
    </div>
  );
}

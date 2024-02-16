import StyleUtils from '@/components/value-type/style-utils';
import { getDisplayName } from '@/utils';
import ObjectUtils from '@/utils/object-utils';
import { CloseCircleFilled } from '@ant-design/icons';
import type { ProFormFieldProps } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import classNames from 'classnames';
import _ from 'lodash';

type ClickableItemType = {
  value: any;
  suffix?: any;
  onClick?: () => void;
  onClear?: () => void;
  className?: any;
  placeholder?: any;
  width?: ProFormFieldProps['width'];
  disabled?: boolean;
  allowClear?: boolean;
  children?: any;
  itemRender?: (displayName: string, item: any) => any;
};

const formatValue = (value = [], itemRender) => {
  const values = Array.isArray(value) ? value : [value];
  if (itemRender) {
    return values.map((it) => itemRender(getDisplayName(it), it));
  }
  return values.map(getDisplayName).join(',');
};

/**
 * Antd ProComponent风格的可点击组件
 */
export default function ClickableItem(props: ClickableItemType) {
  const {
    itemRender,
    className,
    width,
    disabled,
    placeholder = '请选择',
    value,
    onClick,
    onClear,
    children,
    suffix,
    allowClear = true,
  } = props;

  const showPlaceHolder = ObjectUtils.isEmpty(value) && !disabled;

  const title = showPlaceHolder ? placeholder : formatValue(value, itemRender);

  const handleClick = _.debounce(() => {
    if (!disabled && onClick) {
      onClick();
    }
  }, 200);
  const handleClear = () => {
    if (!disabled && onClear) {
      onClear();
    }
  };
  const clearable = allowClear && !disabled && !showPlaceHolder;
  const css = useEmotionCss(({ token }) => {
    return {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      border: `1px solid ${token.colorBorder}`,
      borderRadius: token.borderRadius,
      height: token.controlHeight,
      padding: token.controlPaddingHorizontalSM - 1,
      '&:hover': {
        cursor: 'pointer',
        borderColor: token.colorPrimaryBorderHover,
      },
      '.content': {
        display: 'flex',
        flex: 1,
      },
      '.ant-form-item-has-error &': {
        borderColor: '#ff4d4f',
      },
      '.clearIcon': {
        marginRight: 4,
        padding: '4px 2px',
        color: 'rgba(0, 0, 0, 0.25)',
        fontSize: 12,
        verticalAlign: -1,
        cursor: 'pointer',
        transition: 'color 0.3s',
        '&:hover': {
          color: ' #999',
        },
      },
    };
  });
  const placeholderCss = useEmotionCss(({ token }) => {
    return {
      color: token.colorTextPlaceholder,
    };
  });
  const disabledCss = useEmotionCss(({ token }) => {
    return {
      color: token.colorTextDisabled,
      backgroundColor: token.colorBgContainerDisabled,
      cursor: 'not-allowed',
      '&:hover': {
        borderColor: token.colorBorder,
      },
    };
  });
  const rootCls = classNames(
    'click-item',
    css,
    StyleUtils.proFieldClass(width, disabled),
    {
      [placeholderCss]: showPlaceHolder,
      [disabledCss]: disabled,
    },
    className,
  );

  return (
    <span className={rootCls}>
      <div className="content" onClick={handleClick}>
        {children || title}
      </div>
      {clearable && <CloseCircleFilled className="clearIcon" onClick={handleClear} />}
      {suffix && <div onClick={handleClick}>{suffix}</div>}
    </span>
  );
}

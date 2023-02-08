import { Input, Label, View } from '@tarojs/components';
import classNames from 'classnames';
import './styles.less';
import { InputProps } from '@tarojs/components/types/Input';

// type: text, password, number, idcard, digit, phone
// type: money
// className: "", noLabel, noBorder, underLine

export type EleInputType = {
  title?: string;
  name: string;
  onChange: (value: any, e?: InputProps.inputEventDetail) => void;
  // error?: boolean
  // clear?: boolean
  // border?: boolean
  required?: boolean;
  bordered?: boolean;
  className?: any;
} & Partial<InputProps>;

export default function EleInput(props: EleInputType) {
  const { title, name, value, onChange, onBlur, onClick, disabled, required, bordered, className, ...rest } = props;
  const handleInput = (e) => onChange && onChange(e.detail.value, e);
  const handleBlur = (e) => {
    onBlur && onBlur(e);
    onChange && onChange(e.detail.value, e);
  };
  const handleClick = (e) => {
    if (!disabled) {
      onClick && onClick(e.detail.value);
    }
  };
  const rootCls = classNames(
    'ele-input',
    {
      'ele-input--bordered': bordered,
    },
    className
  );
  const labelCls = classNames('ele-input__label', {
    'ele-input--required': required,
  });
  const valueCls = classNames('ele-input__value');

  return (
    <View className={rootCls}>
      {title && (
        <Label className={labelCls} for={name}>
          {title}
        </Label>
      )}
      <Input
        id={name}
        name={name}
        className={valueCls}
        value={value}
        onInput={handleInput}
        onBlur={handleBlur}
        onClick={handleClick}
        {...rest}
      />
      <View className={'ele-input__children'}>{props.children}</View>
    </View>
  );
}

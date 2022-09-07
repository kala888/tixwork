import { Label, Radio, RadioGroup as TaroRadioGroup, View } from '@tarojs/components';
import { CandidateValue } from '@/nice-router/nice-router-types';
import './styles.less';
import classNames from 'classnames';

type RadioGroupType = {
  options: CandidateValue[];
  value: string | string[];
  direction?: 'horizontal' | 'vertical';
  onChange: (value: string | string[]) => void;
};
export default function RadioGroup(props: RadioGroupType) {
  const { options = [], value = [], onChange, direction } = props;

  const theValue = Array.isArray(value) ? value[0] : value;

  const handleChange = (e) => {
    onChange && onChange(e.detail.value);
  };

  const rootCls = classNames('radio-group', `radio-group--${direction}`);

  return (
    <TaroRadioGroup onChange={handleChange}>
      <View className={rootCls}>
        {options.map((it, i) => {
          // @ts-ignore
          const itemValue: any = it.id;
          const checked = theValue.includes(itemValue);
          const key = `${it?.id}-${i}`;
          return (
            <Label className='radio-group__label' for={key} key={key}>
              <Radio className='radio-group__value' value={itemValue} checked={checked}>
                {it.title}
              </Radio>
            </Label>
          );
        })}
      </View>
    </TaroRadioGroup>
  );
}

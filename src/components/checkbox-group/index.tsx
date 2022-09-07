import { Checkbox, CheckboxGroup as TaroCheckboxGroup, Label, View } from '@tarojs/components';
import { CandidateValue } from '@/nice-router/nice-router-types';
import './styles.less';
import classNames from 'classnames';

type CheckboxGroupType = {
  options: CandidateValue[];
  value: string | string[];
  direction?: 'horizontal' | 'vertical';
  onChange: (value: string[]) => void;
};
export default function CheckboxGroup(props: CheckboxGroupType) {
  const { options = [], value = [], onChange, direction = 'horizontal' } = props;

  const theValue = Array.isArray(value) ? value : [value];

  const handleChange = (e) => {
    onChange && onChange(e.detail.value);
  };
  const rootCls = classNames('checkbox-group', `checkbox-group--${direction}`);

  return (
    <TaroCheckboxGroup onChange={handleChange}>
      <View className={rootCls}>
        {options.map((it, i) => {
          // @ts-ignore
          const itemValue: any = it.id;
          const checked = theValue.includes(itemValue);
          const key = `${it?.id}-${i}`;
          return (
            <Label className='checkbox-group__label' for={key} key={key}>
              <Checkbox className='checkbox-group__value' value={itemValue} checked={checked}>
                {it.title}
              </Checkbox>
            </Label>
          );
        })}
      </View>
    </TaroCheckboxGroup>
  );
}

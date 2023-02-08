import { noop } from '@/utils';
import { View } from '@tarojs/components';
import { CandidateValue } from '@/nice-router/nice-router-types';
import './styles.less';
import CheckboxGroup from '@/components/checkbox-group';
import RadioGroup from '@/components/radio-group';

type EleCheckboxProps = {
  candidateValues: CandidateValue[];
  onChange: (value: string | string[]) => void;
  value: string[] | string;
  radio?: boolean;
};

function EleCheckbox(props: EleCheckboxProps) {
  const { candidateValues = [], onChange = noop, value, radio = false } = props;
  const Component = radio ? RadioGroup : CheckboxGroup;
  return (
    <View className='ele-checkbox'>
      <Component options={candidateValues} value={value} onChange={onChange} />
    </View>
  );
}

export default EleCheckbox;

import { AtInputNumber } from 'taro-ui';
import { AtInputNumberProps } from 'taro-ui/types/input-number';

// max,min, step
const EleStepNumberInput = (props: AtInputNumberProps) => {
  const type = props.type === 'digit' ? 'digit' : 'number';
  return <AtInputNumber {...props} type={type} />;
};

export default EleStepNumberInput;

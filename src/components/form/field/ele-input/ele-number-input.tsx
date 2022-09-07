import { noop } from '@/utils';
import EleInput, { EleInputType } from './index';
import './styles.less';

//'text' | 'number' | 'password' | 'phone' | 'idcard' | 'digit'

export type EleNumberInputType = {
  formatter?: (v: any) => any;
  parser?: (v: any) => any;
} & EleInputType;

const defaultFormatter = (v) => v;
const defaultParser = (v) => v;
const EleNumberInput = (props: EleNumberInputType) => {
  const { name, value, onChange = noop, formatter = defaultFormatter, parser = defaultParser, ...others } = props;
  const formattedValue = formatter(value);
  return (
    <EleInput
      name={name}
      // border={false}
      type='number'
      {...others}
      value={formattedValue}
      bordered={false}
      onChange={(v) => onChange(parser(v))}
    />
  );
};

export default EleNumberInput;

import { noop } from '@/utils';
import EleInput, { EleInputType } from './index';
import './styles.less';
import { useEffect, useState } from 'react';

//'text' | 'number' | 'password' | 'phone' | 'idcard' | 'digit'

export type EleNumberInputType = {
  formatter?: (v: any) => any;
  parser?: (v: any) => any;
} & EleInputType;

const defaultFormatter = (v) => v;
const defaultParser = (v) => v;
const EleNumberInput = (props: EleNumberInputType) => {
  const [theValue, setTheValue] = useState();
  const { name, value, onChange = noop, formatter = defaultFormatter, parser = defaultParser, ...others } = props;

  useEffect(() => {
    setTheValue(formatter(value));
  }, [value]);

  const handleChange = (v) => {
    const result = parser(v);
    setTheValue(result);
    const changed = onChange?.(result);
    // @ts-ignore
    if (changed) {
      setTheValue(result);
    }
  };

  return (
    <EleInput
      name={name}
      // border={false}
      type='number'
      {...others}
      value={theValue}
      bordered={false}
      onChange={handleChange}
    />
  );
};

export default EleNumberInput;

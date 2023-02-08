import { useVisible } from '@/service/use-service';
import { formatTime, noop, transToDate } from '@/utils';
import { ModeClass } from '@/nice-router/nice-router-types';
import FloatLayout from '@/components/float-layout';
import DateTimePicker from '@/components/date-picker';
import { useState } from 'react';
import { View } from '@tarojs/components';

import ActionField from './action-field';
import './ele-calendar.less';

type EleCalendarProps = {
  onChange?: Function;
  placeholder?: string;
  label?: string;
  value?: string;
  disabled?: boolean;
} & ModeClass;

/**
 * 有时候弹不出来，记得在外层包一个View
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function EleCalendar(props: EleCalendarProps) {
  const { visible, show, close } = useVisible(false);
  const { mode, onChange = noop, placeholder, label, value, disabled } = props;
  const [date, setDate] = useState(value);

  const handleDateSelected = (dateOfStr) => {
    close();
    setDate(dateOfStr);
    if (mode === 'date') {
      onChange(dateOfStr);
      return;
    }
  };

  const theValue = transToDate(date);
  const displayValue = formatTime(theValue, mode === 'datetime' ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd');
  return (
    <ActionField
      onClick={show}
      disabled={disabled}
      value={displayValue}
      placeholder={placeholder}
      className='ele-calendar'
    >
      <FloatLayout visible={visible} title={false} onCancel={close}>
        <View>{label}</View>
        <DateTimePicker defaultValue={displayValue} onChange={handleDateSelected} onCancel={close} />
      </FloatLayout>
    </ActionField>
  );
}

EleCalendar.defaultProps = {
  placeholder: '请选择',
  onChange: noop,
  mode: 'date',
  value: '',
  disabled: false,
};

export default EleCalendar;

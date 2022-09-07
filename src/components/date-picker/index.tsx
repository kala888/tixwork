import { PickerView, PickerViewColumn, Text, View } from '@tarojs/components';
import { getArrWithTime, getDayListOfMonth, getPickerViewList } from './utils';
import './styles.less';
import { useEffect, useState } from 'react';
import { formatTime, transToDate } from '@/utils';

type OptionsType = {
  yearList: number[];
  monthList: number[];
  dayList: number[];
  hourList: number[];
  minuteList: number[];
};
type StateType = {
  options: OptionsType;
  selectIndexList: number[];
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
};

type DateTimePickerType = {
  defaultValue?: Date;
  type?: 'date' | 'datetime';
  onChange: (valueOfStr: string, valueOfDate: Date) => void;
  onCancel: () => void;
};

function PickerColumn(props) {
  const { items = [], unit = '' } = props;
  return (
    <PickerViewColumn className='picker-view-column'>
      {items.map((it) => (
        <View key={it} className='pick-view-column-item'>
          {it}
          {unit}
        </View>
      ))}
    </PickerViewColumn>
  );
}

export default function DateTimePicker(props: DateTimePickerType) {
  const { defaultValue, onChange, onCancel, type = 'date' } = props;
  const [state, setState] = useState<StateType>({} as any);

  useEffect(() => {
    const theTime = formatTime(defaultValue || new Date(), 'yyyy-MM-dd HH:mm');
    // 1.根据初始化值，获取下拉选项。主要是日会变话
    const options: any = getPickerViewList(theTime);
    const defaultValues = getArrWithTime(theTime);

    const selectIndexList: any[] = [];
    const { yearList, monthList, dayList, hourList, minuteList } = options;

    //根据arr  数据索引
    selectIndexList[0] = yearList.indexOf(defaultValues.year); //  年
    selectIndexList[1] = monthList.indexOf(defaultValues.month); // 月
    selectIndexList[2] = dayList.indexOf(defaultValues.day); //   日
    selectIndexList[3] = hourList.indexOf(defaultValues.hour); //  点
    selectIndexList[4] = minuteList.indexOf(defaultValues.minute); //分

    setState({
      options,
      selectIndexList,
      ...defaultValues,
    });
  }, [defaultValue]);

  const handleChange = (e) => {
    const selectIndexList = e.detail.value;
    const [yearIndex, monthIndex, dayIndex, hourIndex, minuteIndex] = selectIndexList;
    const { yearList, monthList, dayList, hourList, minuteList } = options;

    const year = yearList[yearIndex];
    const month = monthList[monthIndex];
    const day = dayList[dayIndex];
    const hour = hourList[hourIndex];
    const minute = minuteList[minuteIndex];

    setState((pre) => ({
      options: {
        ...(pre.options || {}),
        dayList: getDayListOfMonth(year, month),
      },
      selectIndexList,
      year,
      month,
      day,
      hour,
      minute,
    }));
  };

  const { selectIndexList, options } = state;
  const { yearList = [], monthList, dayList, hourList, minuteList } = options || {};

  const handleSave = () => {
    let valueOfStr = `${state.year}-${state.month}-${state.day}`;
    if (type === 'datetime') {
      valueOfStr = `${valueOfStr}} ${state.hour}:${state.minute}`;
    }

    const valueOfDate = transToDate(valueOfStr);
    console.log('confirm date', valueOfStr, valueOfDate);
    onChange && onChange(valueOfStr, valueOfDate);
  };
  const handleCancel = () => onCancel && onCancel();

  if (!options) {
    return null;
  }

  return (
    <View className='date-picker'>
      <View className='date-picker--toolbar'>
        <Text onClick={handleCancel}>取消</Text>
        <Text onClick={handleSave}>保存</Text>
      </View>
      <PickerView
        className='date-picker--view'
        indicatorStyle='height: 50px;'
        value={selectIndexList}
        onChange={handleChange}
      >
        <PickerColumn items={yearList} unit={' 年'} />
        <PickerColumn items={monthList} unit={' 月'} />
        <PickerColumn items={dayList} unit={' 日'} />
        {type === 'datetime' && (
          <>
            <PickerColumn items={hourList} unit={' 时'} />
            <PickerColumn items={minuteList} unit={' 分'} />
          </>
        )}
      </PickerView>
    </View>
  );
}

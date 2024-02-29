import { noop } from '@/utils';
import ObjectUtils from '@/utils/object-utils';
import { useVisible } from '@/service/use-service';
import _ from 'lodash';
import { CandidateValue } from '@/nice-router/nice-router-types';
import ActionField from './action-field';
import './styles.less';
import { View } from '@tarojs/components';
import FloatLayout from '@/components/float-layout';
import EleCheckbox from '@/components/form/field/ele-checkbox';

type ElePopupSelectProps = {
  onChange?: (value: any) => void;
  multiple?: boolean;
  value: string | string[];
  placeholder?: string;
  label?: string;
  candidateValues: CandidateValue[];
  disabled?: boolean;
};

function ElePopupSelect(props: ElePopupSelectProps) {
  const { visible, show, close } = useVisible(false);

  const { onChange = noop, multiple, value, placeholder, label, candidateValues, disabled } = props;

  const handleChange = (v) => {
    onChange(v);
    if (!multiple) {
      close();
    }
  };

  const getValue = () => {
    let currentValue = value;
    if (ObjectUtils.isEmpty(value)) {
      currentValue = multiple ? [] : '';
    }
    if (multiple && _.isString(value)) {
      currentValue = [value];
    }

    const displayValue = candidateValues
      // @ts-ignore
      .filter((it) => (multiple ? currentValue.includes(it.id) : currentValue === it.id))
      .map((it) => it.title)
      .join('、');

    return {
      currentValue,
      displayValue,
    };
  };

  const { currentValue, displayValue } = getValue();

  const options = candidateValues.map((it) => ({
    label: it.title,
    value: it.id,
    ...it,
  }));

  // const cancelText = multiple ? '确定' : '取消';

  return (
    <ActionField
      onClick={show}
      disabled={disabled}
      value={displayValue}
      placeholder={placeholder}
      toggleStatus={visible}
    >
      <FloatLayout visible={visible} onCancel={close} title={label}>
        <View className='popup-view'>
          <EleCheckbox candidateValues={options} onChange={handleChange} value={currentValue} radio={!multiple} />
        </View>
      </FloatLayout>
    </ActionField>
  );
}

ElePopupSelect.defaultProps = {
  multiple: false,
  value: [],
  candidateValues: [],
};

export default ElePopupSelect;

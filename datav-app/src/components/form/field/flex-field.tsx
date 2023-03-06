import React from 'react'
import EleInput from '@/components/form/field/ele-input'
import ElePopupSelect from '@/components/form/field/ele-popup-select'
import EleCheckboxGroup from '@/components/form/field/ele-checkbox/ele-checkbox-group'
import EleStepNumberInput from '@/components/form/field/ele-step-number-input'
import EleDatePicker from '@/components/form/field/ele-date-picker'
import EleSwitch from '@/components/form/field/ele-switch'
import ElePicker from '@/components/form/field/ele-picker'
import RegionPicker from '@/components/form/field/region-picker'
import EleObjectPicker from '@/components/form/field/ele-object-picker'
import EleRadioGroup from '@/components/form/field/ele-checkbox/ele-radio-group'

const Elements = {
  'step-number': EleStepNumberInput,
  'boolean': EleSwitch,
  'vcode': EleInput,
  'object-picker': EleObjectPicker,
  'picker': ElePicker,
  'region-picker': RegionPicker,
  'checkbox': EleCheckboxGroup,
  'radio': EleRadioGroup

}

export default function FlexField(props) {
  const {type} = props
  if (props.children) {
    return props.children
  }

  // if (type === 'image') {
  //   console.log('.....picker-flexfield', this.props.label, this.props.value)
  // }

  // email，区分email应该是在校验规则上做手脚
  if (type === 'text' || type === 'email') {
    return <EleInput {...props} type='text' border={false}/>
  }

  if (type === 'integer') {
    return <EleInput {...props} type='number'/>
  }
  if (type === 'double' || type === 'decimal') {
    return <EleInput {...props} type='digit'/>
  }

  //钱，这玩意不一样
  if (type === 'money') {
    return <EleInput {...props} extra='元'/>
  }


  // 日期，暂时支持YYYY-MM-DD
  if (type === 'date') {
    return <EleDatePicker {...props} mode='date'/>
  }

  // 日期+时间，暂时支持YYYY-MM-DD HH:mm
  if (type === 'datetime') {
    return <EleDatePicker {...props} mode='datetime'/>
  }

  //通过candidateValues来控制 单选，页面上有的单选Radio
  if (type === 'single-select') {
    return <ElePopupSelect {...props} multiple={false}/>
  }
  const Component = Elements[type] || EleInput
  return <Component {...props} />
  // return <EleInput border={false} {...props} />
}


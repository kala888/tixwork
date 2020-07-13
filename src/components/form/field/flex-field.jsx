import React from 'react'
import { AtInput, AtTextarea } from 'taro-ui'
import EleCalendar from './ele-calendar'
import EleImagePicker from './ele-image-picker'
import EleMoney from './ele-money'
import NumberInput from './ele-number-input'
import ObjectPicker from './ele-object-picker'
import ElePopupSelect from './ele-popup-select'
import EleSwitch from './ele-switch'
import EleTree from './ele-tree'
import EleMobileVerifyCode from './ele-mobile-verify-code'
import './styles.scss'

// TODO 实现附件上传
// TODO 实现checkbox（多用于terms）
// TODO 实现点击后到的一个复杂页面（可以search的listof），然后选择后回到form

export default function FlexField(props) {
  const { type } = props

  // if (type === 'image') {
  //   console.log('.....picker-flexfield', this.props.label, this.props.value)
  // }

  // email，区分email应该是在校验规则上做手脚
  if (type === 'text' || type === 'email') return <AtInput {...props} type='text' border={false} />

  // double，decimal 应该在校验规则，精度上做手脚
  if (type === 'integer' || type === 'double' || type === 'decimal') return <NumberInput {...props} />

  //语义上只有两个值的，可以转换成true/false的场景
  if (type === 'boolean') return <EleSwitch {...props} />

  //钱，这玩意不一样
  if (type === 'money') return <EleMoney {...props} />

  if (type === 'vcode') return <EleMobileVerifyCode {...props} />

  // 日期，暂时支持YYYY-MM-DD
  if (type === 'date') return <EleCalendar {...props} mode='date' />

  // 日期+时间，暂时支持YYYY-MM-DD HH:mm
  if (type === 'datetime') return <EleCalendar {...props} mode='datetime' />

  //通过candidateValues来控制 单选，页面上有的单选Radio
  if (type === 'single-select') return <ElePopupSelect {...props} multiple={false} />

  //通过candidateValues来控制 多选，页面上有的多选Checkbox
  if (type === 'multi-select') return <ElePopupSelect {...props} multiple />

  //max=1来处理单图，max=n处理多图
  if (type === 'image') return <EleImagePicker {...props} />

  if (type === 'textarea' || type === 'long-text') return <AtTextarea {...props} />

  if (type === 'object-picker') return <ObjectPicker {...props} />

  if (type === 'tree-picker') return <EleTree {...props} />

  // phone
  return <AtInput border={false} {...props} />
}

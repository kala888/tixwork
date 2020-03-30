import Taro from '@tarojs/taro'
import { AtInput, AtTextarea } from 'taro-ui'
import { noop } from '@/nice-router/nice-router-util'
import NumberInput from './ele-number-input'
import Money from './ele-money'
import EleSwitch from './ele-switch'
import ElePopupSelect from './ele-popup-select'
import EleCalendar from './ele-calendar'
import EleImagePicker from './ele-image-picker'
import ObjectPicker from './ele-object-picker'
import EleTree from './ele-tree'
import './styles.scss'

// TODO 实现树型选择器
// TODO 实现附件上传
// TODO 处理disabled, hidden, display
// TODO 实现checkbox（多用于terms）
// TODO 实现点击后到的一个复杂页面（可以search的listof），然后选择后回到form

export default class FlexField extends Taro.PureComponent {
  static defaultProps = {
    onChange: noop,
    field: {},
  }

  render() {
    const { label, value, onChange } = this.props
    const { type } = this.props.field

    const field = {
      ...this.props.field,
      onChange,
      value,
    }

    // email，区分email应该是在校验规则上做手脚
    if (type === 'text' || type === 'email') return <AtInput {...field} type='text' border={false} />

    // double，decimal 应该在校验规则，精度上做手脚
    if (type === 'integer' || type === 'double' || type === 'decimal') return <NumberInput {...field} />

    //语义上只有两个值的，可以转换成true/false的场景
    if (type === 'boolean') return <EleSwitch {...field} />

    //钱，这玩意不一样
    if (type === 'money') return <Money {...field} />

    // 日期，暂时支持YYYY-MM-DD
    if (type === 'date') return <EleCalendar label={label} {...field} mode='date' />

    // 日期+时间，暂时支持YYYY-MM-DD HH:mm
    if (type === 'datetime') return <EleCalendar label={label} {...field} mode='date-time' />

    //通过candidateValues来控制 单选，页面上有的单选Radio
    if (type === 'single-select') return <ElePopupSelect label={label} {...field} multiple={false} />

    //通过candidateValues来控制 多选，页面上有的多选Checkbox
    if (type === 'multi-select') return <ElePopupSelect label={label} {...field} multiple />

    //max=1来处理单图，max=n处理多图
    if (type === 'image') return <EleImagePicker {...field} />

    if (type === 'textarea' || type === 'longtext') return <AtTextarea {...field} />

    if (type === 'object-picker') return <ObjectPicker {...field} />

    if (type === 'tree-picker') return <EleTree {...field} />

    // phone
    return <AtInput border={false} {...field} />
  }
}

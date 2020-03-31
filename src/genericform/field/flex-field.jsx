import Taro from '@tarojs/taro'
import { AtInput, AtTextarea } from 'taro-ui'
import NumberInput from './ele-number-input'
import Money from './ele-money'
import EleSwitch from './ele-switch'
import ElePopupSelect from './ele-popup-select'
import EleCalendar from './ele-calendar'
import EleImagePicker from './ele-image-picker'
import ObjectPicker from './ele-object-picker'
import EleTree from './ele-tree'
import './styles.scss'

// TODO 实现附件上传
// TODO 实现checkbox（多用于terms）
// TODO 实现点击后到的一个复杂页面（可以search的listof），然后选择后回到form

export default class FlexField extends Taro.PureComponent {
  render() {
    const { type } = this.props

    // email，区分email应该是在校验规则上做手脚
    if (type === 'text' || type === 'email') return <AtInput {...this.props} type='text' border={false} />

    // double，decimal 应该在校验规则，精度上做手脚
    if (type === 'integer' || type === 'double' || type === 'decimal') return <NumberInput {...this.props} />

    //语义上只有两个值的，可以转换成true/false的场景
    if (type === 'boolean') return <EleSwitch {...this.props} />

    //钱，这玩意不一样
    if (type === 'money') return <Money {...this.props} />

    // 日期，暂时支持YYYY-MM-DD
    if (type === 'date') return <EleCalendar {...this.props} mode='date' />

    // 日期+时间，暂时支持YYYY-MM-DD HH:mm
    if (type === 'datetime') return <EleCalendar {...this.props} mode='date-time' />

    //通过candidateValues来控制 单选，页面上有的单选Radio
    if (type === 'single-select') return <ElePopupSelect {...this.props} multiple={false} />

    //通过candidateValues来控制 多选，页面上有的多选Checkbox
    if (type === 'multi-select') return <ElePopupSelect {...this.props} multiple />

    //max=1来处理单图，max=n处理多图
    if (type === 'image') return <EleImagePicker {...this.props} />

    if (type === 'textarea' || type === 'longtext') return <AtTextarea {...this.props} />

    if (type === 'object-picker') return <ObjectPicker {...this.props} />

    if (type === 'tree-picker') return <EleTree {...this.props} />

    // phone
    return <AtInput border={false} {...this.props} />
  }
}

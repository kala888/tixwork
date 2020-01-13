import { Form } from '@tarojs/components'
import Taro from '@tarojs/taro'
import '../styles.scss'
import EleFlex from '../container/ele-flex'

export default class EleForm extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  submit = (values) => {
    console.log('submit values:', values)
  }

  handleSubmit = (e) => {
    const { formId, value } = e.detail
    const { id: formKey } = this.props
    const payload = {
      wxFormId: formId,
      formKey,
      values: value,
      submit: this.submit,
    }
    console.log('form submit from ele-flex', payload, this.props)
    Taro.eventCenter.trigger('form-submit', payload)
  }

  handleReset = () => {
    // 这里不能清除UI状态，只是清理的缓存数据
    Taro.eventCenter.trigger('form-reset', { formKey: this.props.id })
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} onReset={this.handleReset} reportSubmit='true'>
        <EleFlex {...this.props} formKey={this.props.id} />
      </Form>
    )
  }
}

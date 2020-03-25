import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import GenericForm from '@/genericform/form/generic-form'
import { AtButton } from 'taro-ui'

import { isEmpty } from '@/nice-router/nice-router-util'
import GlobalToast from '@/nice-router/global-toast'
import FormSteps from '@/genericform/form-steps'
import kids from './mock-form.data'
import './index.scss'

export default class FormPage extends Taro.PureComponent {
  handleSubmit = async () => {
    const { errors, values } = await this.form.validateFields()
    if (isEmpty(errors)) {
      console.log('form-values', values)
      GlobalToast.show({ text: 'submit values' })
      return
    }
    console.log('form-errors：', errors)
  }

  handleReset = () => {
    this.form.resetFields()
  }

  render() {
    return (
      <View className='form'>
        <FormSteps steps={steps} />
        <GenericForm ref={(ref) => (this.form = ref)} fields={kids} />

        <View className='footer-button-list'>
          <AtButton onClick={this.handleReset}>reset</AtButton>
          <AtButton type='primary' onClick={this.handleSubmit}>
            submit
          </AtButton>
        </View>
      </View>
    )
  }
}

const steps = [{
  title: '第一步',
  status: 'success',
},
  {
    title: '2222',
    selected: true,
  },
  { title: '完成1' },
  { title: '完成2' },
  { title: '完成3' },
  { title: '完成4' },
  { title: '完成6' },
  { title: '完成7' },
  { title: '完成8' },
  { title: '完成9' },
]

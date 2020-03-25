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
    const groups = [
      {
        title: '六六六的组',
        fields: kids,
      },
    ]

    return (
      <View className='form'>
        <FormSteps steps={steps} />
        <GenericForm ref={(ref) => (this.form = ref)} groups={groups} />

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
]

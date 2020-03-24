import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import GenericForm from '@/genericpage/form/generic-form'
import { AtButton } from 'taro-ui'

import kids from './mock-form.data'
import './index.scss'

export default class FormPage extends Taro.PureComponent {
  handleSubmit = async () => {
    const { errors, values } = await this.form.validateFields()
    console.log(' form errors：', errors)
    console.log(' form values：', values)
  }

  handleReset = () => {
    this.form.resetFields()
  }

  render() {
    return (
      <View className='form'>
        <GenericForm showRequired ref={(ref) => (this.form = ref)} fields={kids} />

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

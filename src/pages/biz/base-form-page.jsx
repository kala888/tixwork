import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import FormItem from '@/genericform/form/form-item'
import { AtButton, AtInput } from 'taro-ui'
import FormUtil from '@/genericform/form-util'

export default class BaseFormPage extends Taro.PureComponent {
  //以name为key
  state = {
    fieldValues: {},
  }

  handleChange = (name, value, event) => {
    // console.log('item event maybe you needed', event)
    const fieldValue = FormUtil.getValue(value)
    this.setState((preState) => ({
      fieldValues: {
        ...preState.fieldValues,
        [name]: fieldValue,
      },
    }))
  }
  handleSubmit = () => {
    console.log('submit to remote', this.state.fieldValues)
  }

  render() {
    return (
      <View style='padding:20px'>
        <FormItem label='姓名' rules={[{ required: true }]}>
          <AtInput
            name='name'
            placeholder='大名。。。。'
            border={false}
            onChange={this.handleChange.bind(this, 'name')}
          />
        </FormItem>

        <FormItem label='小名'>
          <AtInput
            name='nickname'
            placeholder='你的小名是啥'
            border={false}
            onChange={this.handleChange.bind(this, 'nickname')}
          />
        </FormItem>

        <AtButton onClick={this.handleSubmit}>提交</AtButton>
      </View>
    )
  }
}

import Taro from '@tarojs/taro'
import { Button, View } from '@tarojs/components'
import validator from '@/genericpage/form/validator'

export default class TestPage extends Taro.PureComponent {
  validate = () => {
    const field = {
      name: '5-height',
      label: '身高（cm）',
      type: 'integer',
      placeholder: '输入身高',
      rules: [
        {
          type: 'integer',
          max: 10,
        },
      ],
    }
    validator(field, 1).then((errors) => console.log('get-err', errors))
  }

  render() {
    return (
      <View className='form'>
        <Button onClick={this.validate}>1111</Button>
      </View>
    )
  }
}

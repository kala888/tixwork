import Taro from '@tarojs/taro'

import { Label, Radio, RadioGroup, View } from '@tarojs/components'
import './styles.scss'

export default class ChooseQuestion extends Taro.Component {
  static options = {
    addGlobalClass: true,
  }

  state = {
    selected: null,
  }

  handleSelect = (e) => {
    const { detail: { value } = {} } = e
    const { formKey, name } = this.props
    this.setState(
      {
        selected: value,
      },
      () => {
        Taro.eventCenter.trigger('form-value-changed', {
          name,
          value,
          formKey,
        })
      }
    )
  }

  render() {
    const { options = [], title, defaultValue } = this.props

    const selectedValue = this.state.selected || defaultValue

    return (
      <View className='choose-question'>
        <RadioGroup className='choose-question-radio' onChange={this.handleSelect}>
          <Label className='label-text'>{title}</Label>
          <View className='choose-question-radio-options'>
            {options.map((it) => {
              const { id, name } = it
              return (
                <View key={id} className='choose-question-radio-options-radio'>
                  <Radio value={id} checked={selectedValue === id}>
                    {name}
                  </Radio>
                </View>
              )
            })}
          </View>
        </RadioGroup>
      </View>
    )
  }
}

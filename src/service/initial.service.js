import Taro from '@tarojs/taro'
import { handleResetForm, handleSaveField, handleSubmit } from './form.service'

// eslint-disable-next-line import/prefer-default-export
export function initial() {
  console.log('do initial')
  Taro.eventCenter.on('form-submit', handleSubmit)
  Taro.eventCenter.on('form-value-changed', handleSaveField)
  Taro.eventCenter.on('form-reset', handleResetForm)
}

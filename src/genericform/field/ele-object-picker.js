import Taro from '@tarojs/taro'
import NavigationService from '@/nice-router/navigation.service'
import { isEmpty, noop } from '@/nice-router/nice-router-util'
import isObject from 'lodash/isObject'
import { AtIcon } from 'taro-ui'
import { View } from '@tarojs/components'

import ActionField from './action-field'
import './styles.scss'

const OBJECT_PICKER_PAGE = '/genericform/object-picker-page'

export default class ObjectPicker extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }
  static defaultProps = {
    onChange: noop,
  }

  goObjectPickerPage = async () => {
    const { linkToUrl, onChange } = this.props
    const item = await NavigationService.navigate(OBJECT_PICKER_PAGE, { linkToUrl })
    if (!isEmpty(item)) {
      onChange(item)
    }
  }

  render() {
    const { value, placeholder } = this.props
    let displayName = isObject(value) ? value.title : value
    return (
      <ActionField onClick={this.goObjectPickerPage} value={displayName} placeholder={placeholder}>
        <View className='action-field-picker' onClick={this.goObjectPickerPage}>
          <AtIcon className='action-field-picker-icon' value='chevron-right' size={20} />
        </View>
      </ActionField>
    )
  }
}

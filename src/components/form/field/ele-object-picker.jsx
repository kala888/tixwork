import React from 'react'
import NavigationService from '@/nice-router/navigation.service'
import { isEmpty, noop } from '@/nice-router/nice-router-util'
import { View } from '@tarojs/components'
import _ from 'lodash'
import { AtIcon } from 'taro-ui'
import ActionField from './action-field'
import './styles.scss'

const OBJECT_PICKER_PAGE = '/genericform/object-picker-page'

function EleObjectPicker(props) {
  const { linkToUrl, onChange, value, placeholder, disabled } = props

  const goObjectPickerPage = async () => {
    const item = await NavigationService.navigate(OBJECT_PICKER_PAGE, { linkToUrl })
    if (!isEmpty(item)) {
      onChange(item)
    }
  }
  let displayName = _.isObject(value) ? value.title : value
  return (
    <ActionField onClick={goObjectPickerPage} disabled={disabled} value={displayName} placeholder={placeholder}>
      <View className='action-field-picker' onClick={goObjectPickerPage}>
        <AtIcon className='action-field-picker-icon' value='chevron-right' size={20} />
      </View>
    </ActionField>
  )
}

EleObjectPicker.options = {
  addGlobalClass: true,
}
EleObjectPicker.defaultProps = {
  onChange: noop,
}

export default EleObjectPicker

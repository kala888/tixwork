import React from 'react'
import NavigationService from '@/nice-router/navigation-service'
import { isEmpty, noop } from '@/nice-router/nice-router-util'
import _ from 'lodash'
import ActionField from './action-field'
import './styles.scss'

const OBJECT_PICKER_PAGE = '/genericform/object-picker-page'

function getDisplayName(value = '') {
  if (isEmpty(value)) {
    return value
  }
  if (_.isString(value)) {
    return value
  }
  if (_.isArray(value)) {
    return value.map((it) => it.title).join(',')
  }
  return value.title
}

function EleObjectPicker(props) {
  const { onChange, value, placeholder, disabled } = props
  const { searchAction, linkToUrl, maxSelectCount } = props

  const goObjectPickerPage = async () => {
    const items = await NavigationService.navigate(
      OBJECT_PICKER_PAGE,
      { searchAction, linkToUrl, maxSelectCount },
      {
        resolveIsGoBackCallback: true,
      }
    )

    const values = _.isEmpty(items) ? [] : items.map((it) => ({ id: it.id, title: it.title }))

    onChange(values)
  }

  let displayName = getDisplayName(value)

  return (
    <ActionField
      onClick={goObjectPickerPage}
      toggleStatus={false}
      disabled={disabled}
      value={displayName}
      placeholder={placeholder}
    />
  )
}

EleObjectPicker.defaultProps = {
  onChange: noop,
}

export default EleObjectPicker

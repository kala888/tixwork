import NavigationService from '@/nice-router/navigation-service'
import { isEmpty, noop } from '@/nice-router/nice-router-util'
import _ from 'lodash'
import { ActionLike, CandidateValue } from '@/nice-router/nice-router-types'
import ActionField from './action-field'
import React, { useEffect, useState } from 'react'

const OBJECT_PICKER_PAGE = 'ObjectPickerPage'

type EleObjectPickerProps = {
  onChange?: (values: CandidateValue[]) => void;
  value: string | CandidateValue | CandidateValue[];
  placeholder?: string;
  disabled?: boolean;
  searchAction?: ActionLike;
  maxSelectCount?: number;
} & ActionLike;

function getDisplayName(value) {
  if (isEmpty(value)) {
    return ''
  }
  if (_.isString(value)) {
    return value
  }
  if (_.isArray(value)) {
    // @ts-ignore
    return value.map((it) => it.title).join(',')
  }
  // @ts-ignore
  return value.title
}

function EleObjectPicker(props: EleObjectPickerProps) {

  const { onChange = noop, value, placeholder, disabled } = props
  const { searchAction, linkToUrl, maxSelectCount } = props

  const [values, setValues] = useState(value)
  useEffect(() => {
    setValues(value)
  }, [value])


  const goObjectPickerPage = async () => {
    const onGoBack = (items) => {
      console.log('itemsitemsitemsitems', items)
      const v = _.isEmpty(items) ? [] : items.map((it) => ({ id: it.id, title: it.title }))
      onChange(v)
      setValues(v)
    }
    await NavigationService.navigate(
      OBJECT_PICKER_PAGE,
      { onGoBack, searchAction, linkToUrl, maxSelectCount },
    )
  }

  let displayName = getDisplayName(values)

  return (
    <ActionField
      onPress={goObjectPickerPage}
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

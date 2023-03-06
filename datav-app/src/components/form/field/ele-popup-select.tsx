import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Select } from 'teaset'
import { CandidateValue } from '@/nice-router/nice-router-types'
import { getDisplayValue } from '@/components/form/form-util'
import _ from 'lodash'
import ActionIcon from '@/components/action-icon'
import colors from '@/utils/colors'
import { getStrCode } from '@/utils'
import { isEmpty } from '@/nice-router/nice-router-util'

type ElePopupSelectType = {
  onChange: Function;
  multiple?: boolean;
  value?: string | string[];
  placeholder?: string;
  label?: string;
  candidateValues?: CandidateValue[] | string[];
  disabled?: boolean;
  style?: any
};


export default function ElePopupSelect(props: ElePopupSelectType) {
  const { placeholder = '请选择', onChange, style, label = '', candidateValues = [], ...rest } = props
  // @ts-ignore
  const theItem = _.find(candidateValues, it => it.id === props.value)
  const theTitle = getDisplayValue(theItem)

  const handleChange = (item) => {
    onChange && onChange(item.id, item)
  }
  let items = candidateValues
  if (typeof candidateValues[0] === 'string') {
    items = candidateValues.map(it => ({ id: it, title: it }))
  }
  const pickerType = items.length >= 4 ? 'auto' : 'popover'

  const rootClass = [styles.container, style]
  if (getStrCode(theTitle) > 26) {
    const height = _.ceil(getStrCode(theTitle) / 26) * 32
    rootClass.push({ height })
  }

  return (
    <Select
      value={theTitle}
      style={rootClass}
      getItemValue={(item) => item.id}
      getItemText={(item) => <View><Text>{item.title}</Text></View>}
      items={items}
      placeholder={placeholder}
      pickerTitle={'选择' + label}
      pickerType={pickerType}
      onSelected={handleChange}
      icon={<View style={{ paddingHorizontal: 10, paddingVertical: 3 }}>
        <ActionIcon
          icon='iconfont-down' color={colors.textColorLighter}
          size={16}
        />
      </View>}
      {...rest}
      disabled={isEmpty(items)}
    />
  )
}


const styles = StyleSheet.create({
  container: {
    height: 32,
  },
})

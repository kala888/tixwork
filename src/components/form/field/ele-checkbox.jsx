import React, { useEffect, useState } from 'react'

import { AtCheckbox, AtRadio } from 'taro-ui'
import { noop } from '@/nice-router/nice-router-util'
import { View } from '@tarojs/components'
import './styles.scss'

function EleCheckbox(props) {
  const [selected, setSelected] = useState()

  const { candidateValues, onChange = noop, value, radio = false } = props

  useEffect(() => {
    setSelected(value)
  }, [value])

  const handleClick = (item) => {
    setSelected(item)
    onChange(item)
  }

  const options = candidateValues.map((it) => ({
    value: it.id,
    label: it.title,
    ...it,
  }))

  return (
    <View className='ele-checkbox'>
      {radio ? (
        <AtRadio options={options} value={selected} onClick={handleClick} />
      ) : (
        <AtCheckbox options={options} selectedList={selected} onChange={handleClick} />
      )}
    </View>
  )
}

EleCheckbox.defaultProps = {
  name: '',
  displayValue: '',
  candidateValues: [],
}

export default EleCheckbox

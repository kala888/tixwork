import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { getExtMode, isNotEmpty, noop } from '@/nice-router/nice-router-util'
import { Label, Radio, RadioGroup, View } from '@tarojs/components'
import './styles.scss'

function EleRadio(props) {
  const [selected, setSelected] = useState('')

  const { candidateValues = [], onChange = noop, value, mode = [] } = props

  useEffect(() => {
    let theSelected = isNotEmpty(value) ? value : _.find(candidateValues, { selected: true })
    setSelected(theSelected || {})
  }, [value, candidateValues])

  const handleChange = (e) => {
    const item = _.find(candidateValues, { id: e.detail.value })
    setSelected(item)
    onChange(item)
  }
  const rootClass = getExtMode(mode).classNames('ele-radio')

  return (
    <View className={rootClass}>
      <RadioGroup onChange={handleChange}>
        <View className='ele-radio-body'>
          {candidateValues.map((item, i) => {
            const checked = isNotEmpty(selected) ? selected?.id === item.id : false
            return (
              <Label className='radio-list__label' for={i} key={i}>
                <Radio className='radio-list__radio' value={item.id} checked={checked}>
                  {item.title}
                </Radio>
              </Label>
            )
          })}
        </View>
      </RadioGroup>
    </View>
  )
}

EleRadio.defaultProps = {
  candidateValues: [],
  onChange: noop,
  value: null,
}

export default EleRadio

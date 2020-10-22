import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { Picker, View } from '@tarojs/components'
import { isEmpty } from '@/nice-router/nice-router-util'

const getOptions = (v) => _.get(v, 'candidateValues', [])
const getValue = (list, idx = 0) => _.get(list, idx, {})

function ElePicker(props) {
  const [innerDisplayValue, setInnerDisplayValue] = useState()
  const [range, setRange] = useState([])
  const { value, mode = 'multiSelector', onChange, candidateValues: source, numberOfColumn = 3 } = props

  useEffect(() => {
    setInnerDisplayValue(value)
    reBuildRangeList(0)
  }, [value, source])

  const reBuildRangeList = (col, idx = 0) => {
    setRange((pre) => {
      const tempRange = col === 0 ? [source] : _.clone(pre)
      for (let i = col; i < numberOfColumn; i++) {
        const v = getValue(tempRange[i], i === col ? idx : 0)
        const list = getOptions(v)
        if (isEmpty(list)) {
          break
        }
        tempRange[i + 1] = list
      }
      return tempRange
    })
  }

  const handleCommit = (e) => {
    const targetValue = e.detail.value

    let selected = targetValue

    if (_.isArray(selected)) {
      selected = selected.map((it, idx) => range[idx][it] || '')
      const idv = _.trim(selected.map((it) => it.title || it).join('-'), '-')
      setInnerDisplayValue(idv)
    } else if (source) {
      selected = source[targetValue]
      setInnerDisplayValue(selected ? selected.title : '')
      // selectedValue = selected ? selected.id : ''
    }

    onChange && onChange(selected)
    // setInnerDisplayValue(innerDisplayValue)
  }

  const handleColumnChange = (e) => {
    const { column, value: selectedValueIdx } = e.detail
    console.log('column...', column)
    reBuildRangeList(column, selectedValueIdx)
  }

  return (
    <Picker mode={mode} onChange={handleCommit} range={range} rangeKey='title' onColumnChange={handleColumnChange}>
      <View className='ele-picker-right-value'>{innerDisplayValue}111</View>
    </Picker>
  )
}

ElePicker.defaultProps = {
  mode: 'multiSelector',
  displayMode: 'right-brief',
  range: null,
  customStyle: {},
  className: null,
  name: '',
  displayValue: '',
}

export default ElePicker

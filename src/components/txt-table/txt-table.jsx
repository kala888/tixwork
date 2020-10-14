import React from 'react'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import _ from 'lodash'
import TxtTableCell from '@/components/txt-table/txt-table-cell'

import './styles.scss'

function transToDoubleItemList(list = []) {
  const newList = []
  const sourceLength = list.length
  const twoColumnLength = parseInt(sourceLength / 2) + (sourceLength % 2)

  for (let i = 0; i < twoColumnLength; i += 1) {
    const leftIdx = i * 2
    const rightIdx = i * 2 + 1
    const left = list[leftIdx]
    const right = rightIdx >= sourceLength ? null : list[rightIdx]
    newList.push({
      id: leftIdx,
      left,
      right,
    })
  }
  return newList
}

export default function TxtTable({ list = [], maxLine = 100 }) {
  const doubleItemList = transToDoubleItemList(list)
  const valueCls = classNames('info-row-cell-value', {
    'info-row-cell-1lines': maxLine === 1,
    'info-row-cell-2lines': maxLine === 2,
    'info-row-cell-3lines': maxLine === 3,
    'info-row-cell-4lines': maxLine === 4,
  })
  const maxTitleWidth = _.max(list.map((it) => (isNotEmpty(it.title) ? it.title.length : 0)))
  console.log('111111', maxTitleWidth)
  return (
    <View className='txt-table'>
      {doubleItemList.map((it) => {
        const { id, left, right } = it
        return (
          <View key={id} className='info-row'>
            <TxtTableCell
              maxTitleWidth={maxTitleWidth}
              title={left.title}
              value={left.value}
              valueClassName={valueCls}
            />
            {isNotEmpty(right) && (
              <TxtTableCell
                maxTitleWidth={maxTitleWidth}
                title={right.title}
                value={right.value}
                valueClassName={valueCls}
              />
            )}
          </View>
        )
      })}
    </View>
  )
}

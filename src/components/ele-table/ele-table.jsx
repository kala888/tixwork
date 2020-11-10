import { View } from '@tarojs/components'
import React from 'react'
import EleTableRow from '@/components/ele-table/ele-table-row'
import classNames from 'classnames'
import './ele-table.scss'

/**
 * title:'xxx',
 * items:[
 *  {id:1, header:true, cellList:[{title:'xx',}]}
 *
 * ]
 *
 *
 */
function EleTable(props) {
  const { title, data = [], bordered = true } = props

  const rootClass = classNames('ele-table', {
    'ele-table--no-border': !bordered,
  })
  return (
    <View className={rootClass}>
      <View className='ele-table-title'>{title}</View>
      {data.map((row, idx) => (
        <EleTableRow key={`ele-table-row-${idx}`} items={row.items} header={row.header} />
      ))}
      {props.children}
    </View>
  )
}

export default EleTable

import React from 'react'
import Listof from '@/listof/listof'

function EleListof(props) {
  const { dataContainer, list, listMeta, displayMode, customStyle = {}, horizontal, numColumns } = props
  return (
    <Listof
      horizontal={horizontal}
      dataContainer={dataContainer}
      list={list}
      listMeta={listMeta}
      displayMode={displayMode}
      numColumns={numColumns}
      style={customStyle}
    />
  )
}

export default EleListof

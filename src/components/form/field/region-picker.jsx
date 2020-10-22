import React, { useEffect, useState } from 'react'
import StorageTools from '@/nice-router/storage-tools'
import NavigationService from '@/nice-router/navigation.service'
import ElePicker from '@/components/form/field/ele-picker'

function RegionPicker(props) {
  const [source, setSource] = useState([])

  useEffect(() => {
    const regionData = StorageTools.get('region-data', null)
    let initialed = false
    if (regionData) {
      setSource(regionData)
      initialed = true
    }

    NavigationService.ajax(
      'queryLocationData/',
      {},
      {
        onSuccess: (resp) => {
          if (!initialed) {
            setSource(regionData)
          }
          StorageTools.set('region-data', resp, 3600)
        },
      }
    )
  }, [])

  return <ElePicker {...props} candidateValues={source} />
}

RegionPicker.defaultProps = {
  mode: 'multiSelector',
  displayMode: 'right-brief',
  range: null,
  customStyle: {},
  className: null,
  name: '',
  displayValue: '',
}

export default ElePicker

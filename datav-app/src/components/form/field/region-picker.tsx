import React, { useEffect, useState } from 'react'
import StorageTools from '@/nice-router/storage-tools'
import NavigationService from '@/nice-router/navigation-service'
import ElePicker, { ElePickerProps } from '@/components/form/field/ele-picker'

// TODO picker value sample: ['P000003', 'C000010', 'D000038']
function RegionPicker(props: ElePickerProps) {
  const [source, setSource] = useState<any>([])

  useEffect(() => {
    // const regionData = StorageTools.get('region-data', null)
    // let initialed = false
    // if (isNotEmpty(regionData)) {
    //   setSource(regionData)
    //   initialed = true
    // }

    NavigationService.ajax(
      'wxappService/makeRegionList/',
      {},
      {
        onSuccess: (resp) => {
          if (!Array.isArray(resp)) {
            return
          }
          setSource(resp)
          StorageTools.set('region-data', resp, 3600)
        },
      },
    )
  }, [])

  return <ElePicker {...props} candidateValues={source} numberOfColumn={3} />
}

export default RegionPicker

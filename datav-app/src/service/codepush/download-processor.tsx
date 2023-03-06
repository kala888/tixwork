import React, { useEffect, useState } from 'react'
import { DeviceEventEmitter, Text } from 'react-native'

export const DOWNLOAD_EVENT = 'app-download'

export default function DownloadProcessor(props) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    DeviceEventEmitter.addListener(DOWNLOAD_EVENT, (title) => {
      console.log('the tips', title)
      setValue(title)
    })
    return () => {
      if (DeviceEventEmitter.remove) {
        DeviceEventEmitter.remove(DOWNLOAD_EVENT)
      }
    }
  }, [])

  return (<Text>{value || props.title}</Text>)
}

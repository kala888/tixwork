import React, { useState } from 'react'
import { View } from '@tarojs/components'
import ElePicker from '@/components/form/field/ele-picker'
import './home.scss'

function HomePage() {
  const [info, setInfo] = useState([])

  return (
    <View className='home-page'>
      {/*<RegionPicker onChange={setInfo} />*/}
      <ElePicker onChange={setInfo} source={[]} />
      {JSON.stringify(info?.map((it) => it.name).join('-'))}
    </View>
  )
}

export default HomePage

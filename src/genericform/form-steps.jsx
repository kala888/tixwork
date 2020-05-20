import React from 'react'
import NavigationService from '@/nice-router/navigation.service'
import { View } from '@tarojs/components'
import { AtSteps } from 'taro-ui'

import './styles.scss'

function FormSteps({ steps }) {
  const handleChange = (current) => {
    NavigationService.view(
      steps[current],
      {},
      {
        navigationOptions: { method: 'redirectTo' },
      }
    )
  }

  const stepList = steps.map((it) => ({ ...it, desc: it.desc || it.brief || '' }))
  let selectedIdx = steps.findIndex((it) => it.selected)
  return (
    <View className='form-steps'>
      <AtSteps items={stepList} current={selectedIdx} onChange={handleChange} />
    </View>
  )
}

FormSteps.defaultProps = {
  steps: [],
}
export default FormSteps

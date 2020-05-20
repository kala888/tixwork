import React from 'react'
import NavigationService from '@/nice-router/navigation.service'
import { useAsyncEffect } from '@/service/use.service'
import { View } from '@tarojs/components'

function TestPage() {
  useAsyncEffect(() => {
    NavigationService.view('mock-generic-page/')
  })
  return <View />
}

export default TestPage

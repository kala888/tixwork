import { View } from '@tarojs/components'
import { useAsyncEffect } from '@/service/use.service'
import NavigationService from '@/nice-router/navigation.service'

function TestPage() {
  useAsyncEffect(() => {
    NavigationService.view('mock-generic-page/')
  })
  return <View />
}

TestPage.options = {
  addGlobalClass: true,
}
export default TestPage

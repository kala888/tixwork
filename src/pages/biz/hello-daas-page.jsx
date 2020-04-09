import { View } from '@tarojs/components'
import './styles.scss'

function HelloDaaSPage() {
  return <View className='hello-daas'></View>
}

HelloDaaSPage.options = {
  addGlobalClass: true,
}
export default HelloDaaSPage

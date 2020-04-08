import { View, WebView } from '@tarojs/components'
import { useVisible } from '@/nice-router/use-visible'
import { AtActivityIndicator } from 'taro-ui'

export default function H5Page() {
  const { visible, show, close } = useVisible(true)
  const { uri = false } = this.$router.params || {}
  console.log('action path in H5', uri)
  show()
  return (
    <View>
      <AtActivityIndicator isOpened={visible} size={50} mode='center' />
      <WebView src={uri} onLoad={close} />
    </View>
  )
}

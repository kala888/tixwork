import { View } from '@tarojs/components'
import { toRpx } from '@/utils/index'

function EleWhiteSpace({ height, color }) {
  return <View style={{ height: toRpx(height), backgroundColor: color }} />
}

EleWhiteSpace.options = {
  addGlobalClass: true,
}

EleWhiteSpace.defaultProps = {
  height: 30,
  color: '#fff',
}
export default EleWhiteSpace

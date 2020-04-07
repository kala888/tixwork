import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import EleFab from '@/genericpage/elements/ele-fab'

function Container(props) {
  console.log('base page configuration')

  return (
    <View className='container'>
      <EleFab />
      {props.children}
    </View>
  )
}

Container.propTypes = {
  children: PropTypes.object,
  shareAction: PropTypes.object,
}

Container.defaultProps = {
  checkPhone: false,
  shareAction: {},
}

Container.options = {
  addGlobalClass: true,
}

export default Container

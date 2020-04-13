import { connect } from '@tarojs/redux'
import ListofPageBase from './listof-page-base'

const AbsPage = (props) => <ListofPageBase {...props} />

export default connect(({ listofpage4 }) => ({ ...listofpage4 }))(AbsPage)

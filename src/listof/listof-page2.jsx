import { connect } from '@tarojs/redux'
import ListofPageBase from './listof-page-base'

const AbsPage = (props) => <ListofPageBase {...props} />

export default connect(({ listofpage2 }) => ({ ...listofpage2 }))(AbsPage)

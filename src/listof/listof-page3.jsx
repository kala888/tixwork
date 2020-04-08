import { connect } from '@tarojs/redux'
import ListofPageBase from './listof-page-base'

const BasePage = (props) => <ListofPageBase {...props} />

export default connect(({ listofpage3 }) => ({ ...listofpage3 }))(BasePage)

import { connect } from '@tarojs/redux'
import GenericPageBase from './generic-page-base'

const AbsPage = (props) => <GenericPageBase {...props} />

export default connect(({ genericpage }) => ({ ...genericpage }))(AbsPage)

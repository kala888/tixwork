import { connect } from '@tarojs/redux'
import GenericPageBase from './generic-page-base'

const BasePage = (props) => <GenericPageBase {...props} />

export default connect(({ genericpage }) => ({ ...genericpage }))(BasePage)

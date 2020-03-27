import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import EleForm from '@/genericform/form/ele-form'
import { AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'
import isNil from 'lodash/isNil'

import { isEmpty } from '@/nice-router/nice-router-util'
import GlobalToast from '@/nice-router/global-toast'
import FormSteps from '@/genericform/form-steps'
import NavigationService from '@/nice-router/navigation.service'
import { ajaxPullDownRefresh } from '@/utils/index'
import './index.scss'

import mockData from './mock-form.data'

@connect(({ genericform }) => ({ ...genericform }))
class GenericformPage extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  static defaultProps = {
    groupList: [],
    stepList: [],
    actionList: [],
  }

  componentDidMount() {
    const { pageTitle = '' } = this.props
    Taro.setNavigationBarTitle({ title: pageTitle })
  }

  componentWillReceiveProps(nextProps) {
    const { pageTitle: currentTitle = '' } = this.props
    const { pageTitle: nextPageTitle = '' } = nextProps
    if (currentTitle !== nextPageTitle) {
      Taro.setNavigationBarTitle({ title: nextPageTitle })
    }
  }

  onPullDownRefresh = () => {
    ajaxPullDownRefresh(this.props)
  }

  handleActionClick = async (action = {}) => {
    const { code } = action
    if (code === 'reset') {
      this.form.resetFields()
      return
    }
    if (code === 'submit') {
      await this.handleSubmit()
      return
    }
    NavigationService.view(action)
  }

  handleSubmit = async () => {
    const { errors, values } = await this.form.validateFields()
    if (isEmpty(errors)) {
      console.log('form-values', values)
      GlobalToast.show({ text: 'submit values' })
      return
    }
    console.log('form-errors：', errors)
  }

  getDefaultValues = (groupList = []) => {
    const defaultValues = {}

    for (const group of groupList) {
      const { fields = [] } = group
      for (const field of fields) {
        const { name, value } = field
        if (!isNil(value)) {
          defaultValues[name] = value
        }
      }
    }
    return defaultValues
  }

  render() {
    const { groupList = [], stepList = [], actionList = [] } = mockData
    // const { groupList = [], stepList = [], actionList = [] } = this.props

    const footerActionList = actionList.map((it) => ({
      type: it.code === 'next' || it.code === 'submit' ? 'primary' : null,
      ...it,
    }))
    const initialValues = this.getDefaultValues(groupList)
    console.log('form initial values', initialValues)

    const groups = groupList.filter((it) => !it.hidden)

    return (
      <View className='generic-form-page'>
        <FormSteps steps={stepList} />
        <EleForm ref={(ref) => (this.form = ref)} groups={groups} initialValues={initialValues} />

        <View className='footer-button-list'>
          {footerActionList.map((it) => {
            const { code, title, type } = it
            return (
              <AtButton type={type} key={code} onClick={this.handleActionClick.bind(this, it)}>
                {title}
              </AtButton>
            )
          })}
        </View>
      </View>
    )
  }
}

export default GenericformPage

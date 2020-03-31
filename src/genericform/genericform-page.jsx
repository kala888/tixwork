import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import EleForm from '@/genericform/form/ele-form'
import { AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'
import isNil from 'lodash/isNil'

import { isEmpty } from '@/nice-router/nice-router-util'
import NavigationService from '@/nice-router/navigation.service'
import { ajaxPullDownRefresh } from '@/utils/index'
import FormSteps from '@/genericform/form-steps'

import './index.scss'

@connect(({ genericform }) => ({ ...genericform }))
class GenericformPage extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  static defaultProps = {
    groupList: [],
    stepList: [],
    actionList: [],
    fieldList: [],
  }

  componentDidMount() {
    const { pageTitle = '' } = this.props
    Taro.setNavigationBarTitle({ title: pageTitle })
    NavigationService.ajax('mock-generic-form/')
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
    if (this.isSubmitAction(code)) {
      await this.handleSubmit(action)
      return
    }
    NavigationService.view(action)
  }

  handleSubmit = async (action) => {
    const { errors, values } = await this.form.validateFields()
    if (isEmpty(errors)) {
      console.log('form-values', values)
      NavigationService.post(action, values, {
        asForm: true,
      })
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

  isSubmitAction = (code) => code === 'nextStep' || code === 'submit' || code === 'commit'

  render() {
    const { id, groupList = [], fieldList = [], stepList = [], actionList = [] } = this.props
    // 有时候初始值undefined，https://github.com/NervJS/taro/issues/5864
    // const { id, groupList, fieldList, stepList, actionList } = this.props
    console.log('xxxxx2', groupList, fieldList, stepList, actionList)
    const footerActionList = actionList.map((it) => ({
      type: this.isSubmitAction(it.code) ? 'primary' : null,
      ...it,
    }))
    const defaultValues = this.getDefaultValues(groupList)
    console.log('form initial defaultValues', defaultValues)
    return (
      <View className='generic-form-page'>
        {stepList.length > 0 && <FormSteps steps={stepList} />}
        <EleForm
          formKey={id}
          ref={(ref) => (this.form = ref)}
          groups={groupList}
          fields={fieldList}
          defaultValues={defaultValues}
        />

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

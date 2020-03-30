import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import EleForm from '@/genericform/form/ele-form'
import { AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'
import isNil from 'lodash/isNil'

import { isEmpty } from '@/nice-router/nice-router-util'
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
    setTimeout(() => {
      this.setState({
        ...mockData,
      })
    }, 2000)
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
    // const { id, groupList = [], stepList = [], actionList = [] } = this.props
    const { id, groupList = [], stepList = [], actionList = [] } = this.state

    const footerActionList = actionList.map((it) => ({
      type: this.isSubmitAction(it.code) ? 'primary' : null,
      ...it,
    }))
    const defaultValues = this.getDefaultValues(groupList)
    console.log('form initial defaultValues', defaultValues)

    const groups = groupList
      .filter((it) => !it.hidden)
      .map((group) => {
        const { name: groupName, title: groupTitle, fields = [] } = group
        const fieldsList = fields.filter((field) => !field.hidden)
        return {
          name: groupName,
          title: groupTitle,
          fields: fieldsList,
        }
      })

    const steps = stepList.map((it) => ({ ...it, desc: it.brief }))

    return (
      <View className='generic-form-page'>
        <FormSteps steps={steps} />
        <EleForm formKey={id} ref={(ref) => (this.form = ref)} groups={groups} defaultValues={defaultValues} />

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

import { useRef } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'
import isNil from 'lodash/isNil'

import EleForm from '@/components/form/ele-form'
import { isEmpty, isNotEmpty } from '@/nice-router/nice-router-util'
import NavigationService from '@/nice-router/navigation.service'
import EleRichText from '@/components/elements/ele-rich-text'
import { usePageTitle, usePullDown } from '@/service/use.service'

import FormSteps from './form-steps'
import './styles.scss'

function GenericformPage(props) {
  const formRef = useRef(null)

  const { pageTitle } = props
  const { id, groupList = [], fieldList = [], stepList = [], actionList = [], content } = props

  usePageTitle(pageTitle)
  usePullDown(props)

  const handleActionClick = async (action = {}) => {
    const { code } = action
    if (code === 'reset') {
      formRef.current.resetFields()
      return
    }
    if (isSubmitAction(code)) {
      await handleSubmit(action)
      return
    }
    NavigationService.view(action)
  }

  const handleSubmit = async (action) => {
    const result = await formRef.current.validateFields()
    const { errors, values } = result
    console.log('resultresultresult', errors, isEmpty(errors))
    if (isEmpty(errors)) {
      console.log('form-values', values)
      NavigationService.post(action, values, {
        asForm: true,
      })
      return
    }
    console.log('form-errors：', errors)
  }

  const getDefaultValues = () => {
    const defaultValues = {}
    for (const group of groupList) {
      const { fieldList: fields = [] } = group
      for (const field of fields) {
        const { name, value } = field
        if (!isNil(value)) {
          defaultValues[name] = value
        }
      }
    }
    return defaultValues
  }

  const isSubmitAction = (code) => code === 'nextStep' || code === 'submit' || code === 'commit'

  const footerActionList = actionList.map((it) => ({
    type: isSubmitAction(it.code) ? 'primary' : null,
    ...it,
  }))
  const defaultValues = getDefaultValues()
  console.log('generic-form initial defaultValues', defaultValues)
  console.log('generic-form groupList', groupList)
  console.log('generic-form fieldList', fieldList)
  return (
    <View className='generic-form-page'>
      {isNotEmpty(content) && <EleRichText content={content} />}
      {stepList.length > 0 && <FormSteps steps={stepList} />}
      <EleForm formKey={id} ref={formRef} groupList={groupList} fieldList={fieldList} defaultValues={defaultValues} />

      <View className='footer-button-list'>
        {footerActionList.map((it) => {
          const { code, title, type } = it
          return (
            <AtButton type={type} key={code} onClick={handleActionClick.bind(this, it)}>
              {title}
            </AtButton>
          )
        })}
      </View>
    </View>
  )
}

GenericformPage.options = {
  addGlobalClass: true,
}

GenericformPage.defaultProps = {
  groupList: [],
  stepList: [],
  actionList: [],
  fieldList: [],
}

export default connect(({ genericform }) => ({ ...genericform }))(GenericformPage)

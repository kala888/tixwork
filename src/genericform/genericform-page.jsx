import React, { useRef } from 'react'
import EleRichText from '@/components/elements/ele-rich-text'

import EleForm from '@/components/form/ele-form'
import NavigationService from '@/nice-router/navigation.service'
import { isEmpty, isNotEmpty } from '@/nice-router/nice-router-util'
import { usePageTitle, usePullDown } from '@/service/use.service'
import { View } from '@tarojs/components'
import EleActionList from '@/components/elements/action-list/ele-action-list'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import FormSteps from './form-steps'
import './styles.scss'

function GenericformPage() {
  const formRef = useRef(null)
  const root = useSelector((state) => state.genericform)
  const { pageTitle } = root
  const { id, groupList = [], fieldList = [], stepList = [], actionList = [], content } = root

  usePageTitle(pageTitle)
  usePullDown(root)

  const isSubmitAction = (code = '') => {
    const submitCodeList = ['nextStep', 'submit', 'commit', 'next', 'nextRecord']
    const result = _.find(submitCodeList, (it) => it.toLowerCase() === code.toLowerCase())
    return !!result
  }

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
    // 其他请求，就直接执行action，把defaultValues传回去
    NavigationService.post(action, defaultValues())
  }

  const handleSubmit = async (action) => {
    console.log('11111', formRef)
    const result = await formRef.current.validateFields()
    const { errors, values } = result
    console.log('resultresultresult', errors, isEmpty(errors))
    if (isEmpty(errors)) {
      console.log('form-values', values)
      NavigationService.post(action, values, {
        asForm: true,
        navigationOptions: { method: 'redirectTo' },
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
        if (!_.isNil(value)) {
          defaultValues[name] = value
        }
      }
    }
    return defaultValues
  }
  const footerActionList = actionList.map((it) => ({
    uiType: isSubmitAction(it.code) ? 'primary' : null,
    ...it,
    onClick: handleActionClick.bind(this, it),
  }))
  const defaultValues = getDefaultValues()
  console.log('generic-form initial defaultValues', defaultValues)
  console.log('generic-form groupList', groupList)
  console.log('generic-form fieldList', fieldList)
  return (
    <View className='generic-form-page'>
      {isNotEmpty(content) && <EleRichText content={content} />}
      {stepList.length > 0 && <FormSteps steps={stepList} />}
      <EleForm
        formKey={id}
        ref={formRef}
        groupList={groupList}
        fieldList={fieldList}
        defaultValues={defaultValues}
        handleActionClick={handleActionClick}
      />
      <EleActionList mode='full' list={footerActionList} />
    </View>
  )
}

export default GenericformPage

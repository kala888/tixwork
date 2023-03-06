import React, { useRef } from 'react'
import EleRichText from '@/components/elements/ele-rich-text'

import EleForm from '@/components/form/ele-form'
import NavigationService from '@/nice-router/navigation-service'
import { isEmpty, isNotEmpty, LoadingType } from '@/nice-router/nice-router-util'
import _ from 'lodash'
import { ActionLike } from '@/nice-router/nice-router-types'
import ActionUtil from '@/nice-router/action-util'
import FormSteps from './form-steps'
import { StyleSheet, View } from 'react-native'
import colors from '@/utils/colors'
import FormFooter from '@/genericform/form-footer'
import { isPDA } from '@/utils'


export type GenericFormType = {
  id?: string
  groupList: any []
  fieldList: any []
  stepList: any[]
  actionList?: any[]
  content?: string
  onSubmitSuccess?: any
  layout?: any
}

const BaseLayout = (props) => {
  return (
    <View>
      {props.children}
      <View style={{ paddingBottom: 100 }}>
        {props.footer}
      </View>
    </View>
  )
}

function GenericForm(props: GenericFormType) {

  const formRef = useRef(null)
  // @ts-ignore
  const { id, groupList = [], fieldList = [], stepList = [], actionList = [], content } = props
  const { onSubmitSuccess, layout = BaseLayout } = props

  const handleActionClick = async (action: ActionLike = {}) => {
    const { code } = action
    if (code === 'reset') {
      // @ts-ignore
      formRef.current.resetFields()
      return
    }
    if (ActionUtil.isSubmitAction(code)) {
      await handleSubmit(action)
      return
    }
    // 其他请求，就直接执行action，把defaultValues传回去
    await NavigationService.post(action, defaultValues, {
      onSuccess: onSubmitSuccess,
    })
  }

  const handleSubmit = async (action) => {
    console.log('11111', formRef)
    // @ts-ignore
    const result = await formRef.current.validateFields()
    const { errors, values } = result
    const { navigationMethod = 'replace' } = action

    console.log('loading.....', action.loading)

    if (isEmpty(errors)) {
      console.log('form-values', values)
      await NavigationService.post(action, values, {
        asForm: true,
        navigationMethod,
        loading: action.loading,
        onSuccess: onSubmitSuccess,
      })
      return
    }
    console.log('form-errors：', errors)
  }

  const handleFieldChange = async (field = {} as any) => {
    const { onChangeAction } = field
    if (onChangeAction) {
      const { navigationMethod = 'replace' } = onChangeAction
      // @ts-ignore
      const values = await formRef.current.getValues()
      console.log('field change, just post form to backend', values)
      await NavigationService.post(onChangeAction, values, {
        asForm: true,
        navigationMethod,
        loading: LoadingType.Modal,
        onSuccess: onSubmitSuccess,
      })
    }
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
  // @ts-ignore
  const footerActionList = actionList.map((it) => ({
    uiType: ActionUtil.isSubmitAction(it.code) ? 'primary' : 'secondary',
    style: styles.button,
    ...it,
    onPress: handleActionClick.bind(null, { ...it, loading: LoadingType.Modal }),
  }))
  const defaultValues = getDefaultValues()
  console.log('generic-form initial defaultValues', defaultValues)
  console.log('generic-form groupList', groupList)
  console.log('generic-form fieldList', fieldList)
  const Layout = layout
  const getScanField = () => {
    const result = _.find(fieldList, { type: 'barcode' })
    if (result) {
      return result
    }
    for (const group of groupList) {
      const { fieldList: fields = [] } = group
      const result = _.find(fields, { type: 'barcode' })
      if (result) {
        return result
      }
      return null
    }
  }

  const scanField: any = getScanField()

  const handleScan = (code) => {
    // @ts-ignore
    const { handleFieldChange } = formRef.current || {}
    if (handleFieldChange && scanField) {
      handleFieldChange(scanField.name, code)
    }
  }
  const showScanner = isPDA() ? false : !!scanField
  const footer = <FormFooter items={footerActionList} onScan={handleScan} showScanner={showScanner} />

  return (
    <Layout footer={footer}>
      {isNotEmpty(content) && <EleRichText content={content} />}
      {stepList.length > 0 && <FormSteps steps={stepList} />}
      <EleForm
        formKey={id}
        ref={formRef}
        groupList={groupList}
        fieldList={fieldList}
        defaultValues={defaultValues}
        onActionClick={handleActionClick}
        onFieldChange={handleFieldChange}
      />
    </Layout>
  )
}

export default GenericForm


const styles = StyleSheet.create({
  button: {
    marginTop: 4,
    marginBottom: 0,
    borderRadius: 0,
    borderColor: colors.primaryColor,
  },
})

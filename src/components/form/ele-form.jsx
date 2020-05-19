import React, { useEffect, useImperativeHandle, useMemo, useState, forwardRef } from 'react'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import { View } from '@tarojs/components'
import isFunction from 'lodash/isFunction'
import omit from 'lodash/omit'

import SectionBar from '../section-bar/section-bar'
import FormItem from './form-item'
import FormUtil from './form-util'
import './styles.scss'
import validator from './validator'

// 参考 https://github.com/react-component/form

const getFields = (groupList, fieldList) => {
  if (isNotEmpty(groupList)) {
    let result = []
    groupList.map((it) => {
      if (it.fieldList) {
        result = result.concat(it.fieldList)
      }
    })
    return result
  }
  return fieldList
}

const getGroups = (groupList, fieldList) => {
  const groups = isNotEmpty(groupList) ? groupList : [{ id: 'base-group', fieldList }]
  return groups
    .filter((it) => !it.hidden)
    .map((group) => {
      const { fieldList: groupFields = [] } = group
      const fields = groupFields.filter((field) => !field.hidden)
      return {
        ...group,
        fieldList: fields,
      }
    })
}

function EleForm(props, ref) {
  const {
    defaultValues = {},
    onFieldChange = null,
    fieldList = [],
    groupList = [],
    layout,
    showRequired = true,
    bordered = true,
  } = props
  // console.log('generic-form initial defaultValues,eeeeee', defaultValues)
  //以name为key
  const [fieldValues, setFieldValues] = useState(defaultValues)
  const [fieldErrors, setFieldErrors] = useState({})

  useEffect(() => setFieldValues(defaultValues), [defaultValues])

  const groups = useMemo(() => getGroups(groupList, fieldList), [groupList, fieldList])

  const handleFieldChange = async (name, value) => {
    // 记录处理错误信息
    const errors = await _validateField(name, value)
    console.log('xxxxxxx', name, errors, value)
    if (isNotEmpty(errors)) {
      setFieldErrors((preState) => ({
        ...preState,
        [name]: errors,
      }))
    } else {
      setFieldErrors((preState) => {
        return omit(preState, name)
      })
    }
    // 记录值
    setFieldValues((preState) => ({
      ...preState,
      [name]: value,
    }))

    if (isFunction(onFieldChange)) {
      onFieldChange(name, fieldValues)
    }
  }

  const resetFields = () => {
    setFieldValues(defaultValues)
    setFieldErrors({})
  }

  const validateFields = async () => {
    const fields = getFields(groupList, fieldList)
    const errors = {}
    for (const field of fields) {
      const { name } = field
      const value = fieldValues[name]
      const e = await _validateField(name, value)
      if (isNotEmpty(e)) {
        console.log('set errors', e)
        errors[name] = e
      }
    }
    setFieldErrors(errors)
    return {
      errors: fieldErrors,
      values: fieldValues,
    }
  }

  useImperativeHandle(ref, () => ({
    validateFields,
    resetFields,
  }))

  // 导出，外用
  // this.validateFields = validateFields
  // this.resetFields = resetFields

  const _validateField = (name, value) => {
    const fields = getFields(groupList, fieldList)
    const field = fields.find((it) => it.name === name)
    if (!field) {
      return Promise.resolve()
    }
    return validator(field, value).then((errors) => {
      return errors
    })
  }

  return (
    <View className='ele-form'>
      {groups.map((groupItem) => {
        const { name: groupId, title, brief, fieldList: fields = [] } = groupItem
        return (
          <View key={groupId}>
            {isNotEmpty(title) && <SectionBar title={title} brief={brief} />}

            <View className='ele-form-fields'>
              {fields.map((it) => {
                const field = FormUtil.mergeConfig(it)
                const { name } = field
                const value = fieldValues[name]
                const errors = fieldErrors[name]

                return (
                  <FormItem
                    key={name}
                    bordered={bordered}
                    layout={layout}
                    {...field}
                    showRequired={showRequired}
                    value={value}
                    errors={errors}
                    onChange={handleFieldChange}
                    customized={false}
                  />
                )
              })}
            </View>
          </View>
        )
      })}
    </View>
  )
}

EleForm.options = {
  addGlobalClass: true,
}

export default forwardRef(EleForm)

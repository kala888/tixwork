import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react'
import { isNotEmpty, noop, parseJSON, toBoolean } from '@/nice-router/nice-router-util'
import _ from 'lodash'
import FormItem from './form-item'
import FormUtil from './form-util'
import validator from './validator'
import { StyleSheet, View } from 'react-native'
import SectionBar from '@/components/section-bar/section-bar'
import EleActionList from '@/components/elements/ele-action-list'
import colors from '@/utils/colors'
import EleFlex from '@/components/genericpage/ele-flex'
import { isString } from '@/utils'

// 参考 https://github.com/react-component/form

type EleFormProps = {
  // TODO 需要测试，优化
  formKey?: string;
  defaultValues?: object;
  onFieldChange?: Function;
  fieldList?: any[];
  groupList?: any[];
  showRequired?: boolean;
  bordered?: boolean;
  onActionClick?: any;
};

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
    .filter((it) => !toBoolean(it.hidden))
    .map((group) => {
      const { fieldList: groupFields = [] } = group
      const fields = groupFields.filter((field) => !toBoolean(field.hidden))
      return {
        ...group,
        fieldList: fields,
      }
    })
}

function EleForm(props: EleFormProps, ref) {
  const {
    defaultValues = {},
    onFieldChange,
    fieldList = [],
    groupList = [],
    showRequired = true,
    bordered = true,
  } = props
  // console.log('props', props)
  // console.log('generic-form initial defaultValues,eeeeee', defaultValues)
  //以name为key
  const [fieldValues, setFieldValues] = useState(defaultValues)
  const [fieldErrors, setFieldErrors] = useState({})

  useEffect(() => {
    setFieldValues(defaultValues)
  }, [defaultValues])

  const groups = useMemo(() => getGroups(groupList, fieldList), [groupList, fieldList])

  const handleFieldChange = async (name, value) => {
    // 记录处理错误信息
    const errors = await _validateField(name, value)
    console.log('xxxxxxx:name', name)
    console.log('xxxxxxx:errors', errors)
    console.log('xxxxxxx:value', value)
    if (isNotEmpty(errors)) {
      setFieldErrors((preState) => ({
        ...preState,
        [name]: errors,
      }))
    } else {
      setFieldErrors((preState) => {
        const result = _.clone(preState)
        _.omit(result, name)
        return result
      })
    }
    // 记录值
    setFieldValues((preState) => ({
      ...preState,
      [name]: value,
    }))

    if (onFieldChange && _.isFunction(onFieldChange)) {
      const fields = getFields(groupList, fieldList)
      const field = fields.find((it) => it.name === name)
      onFieldChange(field)
    }
  }

  const resetFields = () => {
    setFieldValues(defaultValues)
    setFieldErrors({})
  }

  const getValues = async () => {
    const fields = getFields(groupList, fieldList).filter(it => !it.disabled )
    const values = {}
    fields.forEach(it => {
      values[it.name] = fieldValues[it.name]
    })
    return values
  }

  const validateFields = async () => {
    const values = await getValues()
    const errors = {}

    const fieldNameList = Object.keys(values)
    for (const name of fieldNameList) {
      const e = await _validateField(name, values[name])
      if (isNotEmpty(e)) {
        console.log('set errors', e)
        errors[name] = e
      }
    }
    setFieldErrors(errors)

    console.log('validate fields result, errors:', errors)
    console.log('validate fields result, values', values)
    return {
      errors,
      values,
    }
  }

  useImperativeHandle(ref, () => ({
    validateFields,
    getValues,
    resetFields,
    handleFieldChange
  }))

  // 导出，外用
  // this.validateFields = validateFields
  // this.resetFields = resetFields

  const _validateField = (name, value) => {
    const fields = getFields(groupList, fieldList)
    const field = fields.find((it) => it.name === name)
    if (!field || field.type === 'display-field') {
      return Promise.resolve()
    }
    // @ts-ignore
    return validator(field, value).then((errors) => {
      return errors
    })
  }

  const { onActionClick = noop } = props

  return (
    <View style={styles.container}>

      {groups.map((groupItem, groupIdx) => {
        const { name: groupId, title, brief, fieldList: fields = [], actionList: groupActionList = [] } = groupItem

        const actionList = groupActionList.map((it) => ({
          ...it,
          onPress: () => onActionClick(it),
        }))


        return (
          <View key={groupId + '_' + groupIdx} style={{ height: 'auto' }}>
            {isNotEmpty(title) && <SectionBar title={title} brief={brief} />}

            <View style={styles.fields}>
              {fields.map((it, idx) => {
                const field = FormUtil.mergeConfig(it)
                const { name, type } = field
                const theValue = fieldValues[name]
                const value = !_.isNil(theValue) ? theValue : it.value
                const key = name + '_' + idx // key重做，因为有taro bug

                if (type === 'display-field' && isNotEmpty(field.value)) {
                  const ele = isString(field.value) ? parseJSON(field.value) : field.value
                  return <EleFlex key={key} {...ele} />
                }

                const errors = fieldErrors[name]

                return (
                  <FormItem
                    key={key}
                    bordered={bordered}
                    {...field}
                    showRequired={showRequired}
                    value={value}
                    errors={errors}
                    onChange={handleFieldChange}
                  />
                )
              })}
            </View>
            {isNotEmpty(groupActionList) && (
              <View style={styles.actionList}>
                <EleActionList mode={['small', 'right']} items={actionList} />
              </View>
            )}
          </View>
        )
      })}
    </View>
  )
}

export default forwardRef(EleForm)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actionList: {
    marginTop: 20,
    borderTopWidth: 0.5,
    borderTopColor: colors.borderColor,
    paddingVertical: 20,
    width: '100%',
  },
  fields: {},
})

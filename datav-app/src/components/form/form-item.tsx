import React from 'react'
import { isNotEmpty, noop, toBoolean } from '@/nice-router/nice-router-util'
import _ from 'lodash'
import GlobalToast from '@/nice-router/global-toast'

import { StyleSheet, Text, View } from 'react-native'


import FormItemTail from './form-item-tail'
import FormUtil from '../form/form-util'
import FlexField from './field/flex-field'
import FormItemLabel from './form-item-label'
import colors from '@/utils/colors'

type FormItemProps = {
  //TODO
  name: string;
  required?: boolean;
  rules: object[];
  showRequired?: boolean;
  clear?: boolean;
  value?: any;
  errors?: string[];
  bordered?: boolean;
  inline?: boolean;
  disabled?: boolean;
  label?: string;
  title?: string;
  tips?: string;
  onChange?: (name: string, value: any) => void;
  children?: React.ReactNode;
  maxLabelWidth?: number
};

function FormItem(props: FormItemProps) {
  const {
    name, required, rules = [], showRequired, clear, value, errors = [],
    bordered, inline, disabled, label, title, tips, onChange = noop,
    maxLabelWidth = 90,
  } = props

  const handleChange = (v, e) => {
    console.log('item event maybe you needed', e)
    let fieldValue = FormUtil.getValue(v)
    onChange(name, fieldValue)
  }

  const onClear = () => {
    onChange(name, null)
  }

  const showRequiredIcon = () => {
    if (showRequired) {
      // @ts-ignore
      return _.isNil(required) ? !!rules.find((rule) => rule.required) : required
    }
    return false
  }

  const hasError = isNotEmpty(errors)

  const handleShowError = () => GlobalToast.show({ text: errors[0] })

  const layout = toBoolean(inline) ? 'horizontal' : 'vertical'

  const containerClass = [
    styles.container,
    hasError ? styles.error : {},
    bordered ? styles.bordered : {},
    styles[layout],
  ]

  const isRequired = showRequiredIcon()

  // 没有disabled，没有错误，有值，显示清理btn，就展示
  const showClear = !disabled && !hasError && clear && isNotEmpty(value)

  const theTail = (showClear || hasError) && (
    <FormItemTail showClear={showClear} hasError={hasError} onClear={onClear} onShowError={handleShowError} />
  )

  const labelWrapperClass = [
    styles.labelWrapper,
    layout === 'vertical' ? styles.verticalLabel : styles.horizontalLabel,
    { maxWidth: _.toNumber(maxLabelWidth) },
  ]
  const theLabel = label || title
  return (
    <View style={containerClass}>
      {
        isNotEmpty(theLabel) && (
          <FormItemLabel
            tips={tips}
            layout={layout}
            required={isRequired}
            tail={layout === 'vertical' ? theTail : null}
            style={labelWrapperClass}
          >
            <Text style={styles.label}>{theLabel}</Text>
          </FormItemLabel>
        )
      }

      <View style={styles.field}>
        {props.children || <FlexField {...props} onChange={handleChange} />}
      </View>

      {layout === 'horizontal' && theTail}
    </View>
  )
}

FormItem.defaultProps = {
  name: '',
  clear: false,
  errors: [],
  onChange: noop,
  layout: 'horizontal', //'vertical','float'
  rules: [],
  showRequired: true,
  inline: true,
  bordered: true,
  disabled: false,
}

export default FormItem


const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 5,
  },
  horizontal: {
    flexDirection: 'row',
  },
  vertical: {
    flexDirection: 'column',
  },

  labelWrapper: {
    width: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  verticalLabel: {
    paddingBottom: 10,
  },
  horizontalLabel: {
    minWidth: 90,
    maxWidth: 120,
  },

  error: {
    color: colors.orange,
  },

  bordered: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderColor,
  },

  field: {
    flex: 1,
    width: '100%',
  },
  label: {
    color: colors.textColor,
    fontSize: 14,
  },
})

import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import isFunction from 'lodash/isFunction'
import find from 'lodash/find'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import FormItem from './form-item'
import validator from './validator'
import './styles.scss'
import mergeConfig from './field-config'

// 参考 https://github.com/react-component/form

export default class GenericForm extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }
  static defaultProps = {
    layout: 'horizontal', //'vertical','float'
    fields: [],
    bordered: true,
    showRequired: false,
    onFieldChange: null,
    initialValues: {},
  }

  //以name为key
  state = {
    fieldValues: {},
    fieldErrors: {},
  }

  componentDidMount() {
    const { initialValues } = this.props
    this.setFieldsValue(initialValues)
  }

  // 设置value到state
  setFieldsValue = (changedValues) => {
    this.setState((preState) => ({
      fieldValues: {
        ...preState.fieldValues,
        ...changedValues,
      },
    }))
  }

  getFieldValues = () => this.state.fieldValues

  handleFieldChange = async (name, value) => {
    const { onFieldChange } = this.props
    // 记录处理错误信息
    const errors = await this._validateField(name, value)
    this.setState((preState) => ({
      fieldErrors: {
        ...preState.fieldErrors,
        [name]: errors,
      },
    }))

    // 记录值
    this.setState(
      (preState) => ({
        fieldValues: {
          ...preState.fieldValues,
          [name]: value,
        },
      }),
      () => {
        if (isFunction(onFieldChange)) {
          onFieldChange(name, this.state.fieldValues)
        }
      }
    )
  }

  resetFields = () => {
    this.setState({
      fieldValues: {},
      fieldErrors: {},
    })
  }

  validateFields = async () => {
    const { fields = [] } = this.props
    const { fieldValues } = this.state

    const fieldErrors = {}
    for (const field of fields) {
      const { name } = field
      const value = fieldValues[name]
      const errors = await this._validateField(name, value)
      if (isNotEmpty(errors)) {
        console.log('set errors', errors)
        fieldErrors[name] = errors
      }
    }
    this.setState({
      fieldErrors,
    })
    return {
      errors: fieldErrors,
      values: fieldValues,
    }
  }

  _validateField = (name, value) => {
    const field = find(this.props.fields, { name })
    if (!field) {
      return Promise.resolve()
    }
    return validator(field, value).then((errors) => {
      return errors
    })
  }

  render() {
    const { fields, layout, showRequired, bordered } = this.props
    const { fieldValues, fieldErrors } = this.state

    return (
      <View className='generic-form'>
        {fields.map((it) => {
          const field = mergeConfig(it)
          const { name } = field
          const value = fieldValues[name]
          const errors = fieldErrors[name]

          return (
            <FormItem
              key={name}
              field={field}
              value={value}
              bordered={bordered}
              errors={errors}
              layout={layout}
              onChange={this.handleFieldChange}
              showRequired={showRequired}
            />
          )
        })}
      </View>
    )
  }
}

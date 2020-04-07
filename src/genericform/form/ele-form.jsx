import Taro from '@tarojs/taro'
import { Block, View } from '@tarojs/components'
import isFunction from 'lodash/isFunction'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import SectionBar from '@/components/common/section-bar'
import FormItem from './form-item'
import validator from './validator'
import FormUtil from '../form-util'
import './styles.scss'

// 参考 https://github.com/react-component/form

export default class EleForm extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  static defaultProps = {
    fieldList: [],
    groupList: [],
    bordered: true,
    showRequired: true,
    onFieldChange: null,
    defaultValues: {},
  }

  //以name为key
  state = {
    fieldValues: {},
    fieldErrors: {},
  }

  componentDidMount() {
    const { defaultValues } = this.props
    console.log('initial form', this.props)
    this.setFieldsValue(defaultValues)
  }

  componentWillReceiveProps(nextProps) {
    const { formKey: currentFormKey } = this.props
    const { formKey: nextFormKey, defaultValues } = nextProps
    console.log('form update，form key changed?', currentFormKey, nextFormKey)
    if (currentFormKey !== nextFormKey) {
      this.resetFields()
      this.setFieldsValue(defaultValues)
    }
  }

  // 设置value到state
  setFieldsValue = (changedValues) => {
    console.log('set field values', changedValues)
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
    const { fieldValues } = this.state
    const fields = this.getFields()

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
    const fields = this.getFields()
    const field = fields.find((it) => it.name === name)
    if (!field) {
      return Promise.resolve()
    }
    return validator(field, value).then((errors) => {
      return errors
    })
  }

  getFields = () => {
    const { fieldList, groupList } = this.props
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

  getGroups = () => {
    const { fieldList, groupList } = this.props
    const groups = isNotEmpty(groupList) ? groupList : [{ id: 'base-group', fieldList }]
    return groups
      .filter((it) => !it.hidden)
      .map((group) => {
        const { fieldList: groupFields = [] } = group
        const fields = groupFields.filter((field) => !field.hidden)
        return {
          ...group,
          fieldsList: fields,
        }
      })
  }

  render() {
    const { layout, showRequired, bordered } = this.props
    const { fieldValues, fieldErrors } = this.state
    const groupList = this.getGroups()
    console.log('groupListgroupList', groupList)
    return (
      <View className='ele-form'>
        {groupList.map((groupItem) => {
          const { name: groupId, title, brief, fieldList = [] } = groupItem
          return (
            <Block key={groupId}>
              {isNotEmpty(title) && <SectionBar title={title} brief={brief} />}

              <View className='ele-form-fields'>
                {fieldList.map((it) => {
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
                      onChange={this.handleFieldChange}
                      customized={false}
                    />
                  )
                })}
              </View>
            </Block>
          )
        })}
      </View>
    )
  }
}

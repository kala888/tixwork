import Taro from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { Form, View } from '@tarojs/components'
import EleButton from '@/genericpage/elements/ele-button'
import EleInput from '@/genericpage/form/ele-input'
import NavigationService from '@/nice-router/navigation.service'
import EleTextarea from '@/genericpage/form/ele-textarea'

import './form.scss'

const KEY = 'recommend-user-form'

@connect(({ recommendUser }) => ({ ...recommendUser }))
export default class RecommendUserPage extends Taro.PureComponent {
  handleSubmit = (e) => {
    const { form: { actions = {} } = {} } = this.props

    const { value } = e.detail
    const payload = {
      formKey: KEY,
      values: value,
      submit: (formData) => NavigationService.post(actions.submit, formData, { asForm: true }),
    }

    console.log('form submit from recommend-project page', payload, this.props)
    Taro.eventCenter.trigger('form-submit', payload)
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <View className='form-page'>
          <EleInput name='contactName' title='科学家姓名' placeholder='请输入科学家姓名' formKey={KEY} />
          <EleInput
            name='contactMobile'
            title='科学家联系电话'
            placeholder='请输入科学家电话'
            type='phone'
            formKey={KEY}
          />
          <EleTextarea name='comments' title='推荐理由' placeholder='请输入推荐理由' formKey={KEY} maxLength={200} />

          <EleButton btnType='submit' title='推荐' className='submit-button' full={false} />
        </View>
      </Form>
    )
  }
}

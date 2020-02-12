import Taro from '@tarojs/taro'
import { Form, View } from '@tarojs/components'

import EleInput from '@/genericpage/form/ele-input'
import EleButton from '@/genericpage/elements/ele-button'

import NavigationService from '@/nice-router/navigation.service'
import Config from '@/utils/config'

import './styles.scss'

const KEY = 'new-org'

export default class NewOrgPage extends Taro.PureComponent {
  handleSubmit = () => {
    const payload = {
      formKey: KEY,
      submit: (formData) => {
        console.log('submit-form', formData)
        NavigationService.post(
          Config.api.NewOrg,
          {
            classSize: formData.memberTotal,
            name: formData.teacher,
            school: formData.orgName,
            schoolClass: formData.groupName,
          },
          {
            asForm: true,
            navigationOptions: { method: 'redirectTo' },
          }
        )
      },
    }

    console.log('form submit from recommend-project page', payload, this.props)
    Taro.eventCenter.trigger('form-submit', payload)
  }
  //
  // classSize: {name: "classSize", type: "number_int"}
  // mobile: {name: "mobile", type: "text"}
  // name: {name: "name", type: "text"}
  // sceneCode: {name: "sceneCode", type: "hidden"}
  // school: {name: "school", type: "text"}
  // schoolClass: {name: "schoolClass", type: "text"}

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <View className='new-org-page'>
          <EleInput
            name='orgName'
            title='机构名称'
            placeholder='学校，幼儿园等机构名称，例如：成都市第七中学'
            formKey={KEY}
          />
          <EleInput name='groupName' title='班级' placeholder='请填部门或者班级名称，例如：三年级2班' formKey={KEY} />
          <EleInput name='memberTotal' title='成员数量' placeholder='成员数量，或者学生数量，例如：10' formKey={KEY} />
          <EleInput
            name='teacher'
            title='老师姓名'
            placeholder='老师或者负责收集的人的姓名，例如王翠花'
            formKey={KEY}
          />

          <View className='footer-button'>
            <View className='footer-button-btn'>
              <EleButton btnType='submit' title='确认创建' />
            </View>
          </View>
        </View>
      </Form>
    )
  }
}

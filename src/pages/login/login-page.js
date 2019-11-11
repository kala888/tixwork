import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import EleButton from '@/genericpage/elements/ele-button'
import { AtRadio } from 'taro-ui'
import NavigationService from '@/nice-router/navigation.service'
import StorageTools from '@/nice-router/storage-tools'
import Config from '@/utils/config'
import m_ from '@/utils/mini-lodash'

import './login.scss'

class LoginPage extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }
  state = {
    userType: 'civilians',
  }

  componentDidMount() {
    const userInfo = StorageTools.get('userInfo', {})
    console.log('local saved authorized', userInfo)
    if (!m_.isEmpty(userInfo)) {
      this.startExam()
    }
  }

  startExam = () => {
    NavigationService.navigate('/pages/biz/exam/question-detail-page')
  }

  handleTypeChange = (userType) => {
    this.setState({ userType })
  }

  handleGetUserInfo = (e) => {
    if (!e || !e.detail) {
      return
    }
    console.log('handle get user info')
    const { userInfo = {} } = e.detail
    const { nickName, avatarUrl } = userInfo
    NavigationService.ajax(
      Config.api.UpdateUserInfo,
      {
        name: nickName,
        avatar: encodeURIComponent(avatarUrl),
        userType: this.state.userType,
      },
      {
        onSuccess: () => {
          StorageTools.set('userInfo', userInfo)
          this.startExam()
        },
      }
    )
  }

  render() {
    return (
      <View className='login-page'>
        <View className='login-page-header'>
          <View className='login-page-header-txt'>
            <View>链问链答</View>
            <View>ChainQA</View>
          </View>
        </View>

        <View className='login-page-body'>
          <AtRadio
            className='login-page-body-type'
            options={[
              { label: '我是公务员', value: 'civil-servant', desc: '会包含公务员特有题型' },
              { label: '我真的不是公务员', value: 'civilians' },
            ]}
            value={this.state.userType}
            onClick={this.handleTypeChange}
          />
          <View>
            <EleButton
              btnType='getUserInfo'
              title='授权开始答题'
              className='login-submit-button'
              full={false}
              onGetUserInfo={this.handleGetUserInfo}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default LoginPage

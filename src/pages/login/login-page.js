import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import EleButton from '@/genericpage/elements/ele-button'
import { AtRadio } from 'taro-ui'
import NavigationService from '@/nice-router/navigation.service'
import StorageTools from '@/nice-router/storage-tools'
import Config from '@/utils/config'

import './login.scss'

class LoginPage extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }
  state = {
    userType: 'guardian',
  }

  componentDidMount = async () => {
    NavigationService.dispatch('app/login', { statInPage: true })
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
    const { userType } = this.state
    NavigationService.ajax(
      Config.api.UpdateUserInfo,
      {
        name: nickName,
        avatar: encodeURIComponent(avatarUrl),
        userType,
      },
      {
        onSuccess: (resp) => {
          console.log('resp', resp)
          StorageTools.set('userInfo', userInfo)
          StorageTools.set('userType', userType)
          NavigationService.view(Config.api.FooterHome)
        },
      }
    )
  }

  render() {
    return (
      <View className='login-page'>
        <View className='login-page-header'>
          <View className='login-page-header-txt'>
            <View>疾疫报</View>
            <View className='login-page-header-txt-brief'>
              疫情防控，人人有责 为帮助各位老师做好学生假期健康状况统计调查，双链科技开发了这个学生健康状况调查的小程序
            </View>
          </View>
        </View>

        <View className='login-page-body'>
          <AtRadio
            className='login-page-body-type'
            options={[
              { label: '我是家长', value: 'guardian' },
              { label: '我是老师', value: 'teacher', desc: '发布管理收集的信息' },
            ]}
            value={this.state.userType}
            onClick={this.handleTypeChange}
          />
          <View>
            <EleButton
              btnType='getUserInfo'
              title='授权使用'
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

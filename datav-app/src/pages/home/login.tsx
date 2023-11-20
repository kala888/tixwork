import React, {useRef, useState} from 'react'
import {Image, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native'
import device from '@/nice-router/device'
import GlobalToast from '@/nice-router/global-toast'
import colors from '@/utils/colors'
import {isEmpty} from '@/nice-router/nice-router-util'
import ElePassword from '../../components/ele-password'
import EleButton from '@/components/elements/ele-button'
import EleInput from '@/components/form/field/ele-input'
import Config from "@/nice-router/nice-router.config";


const logo = require('../../assets/images/logo.png')

export default function LoginPage(props) {
  const {onSuccess} = props

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const userNameRef = useRef<any>()
  const passwordRef = useRef<any>()


  const isValidate = () => {
    if (isEmpty(userName)) {
      GlobalToast.show({text: '工号不能为空'})
      return false
    }
    if (isEmpty(password)) {
      GlobalToast.show({text: '密码不能为空'})
      return false
    }
    return true
  }

  const handleCommit = () => {
    if (!isValidate()) {
      return
    }
    // mock-check
    if (userName === '111111' && password === '222222') {
      onSuccess && onSuccess('http://datav.tiandtech.com/ggas?' + Date.now().valueOf())
      return
    }
    GlobalToast.show({text: '账号密码错误，请稍后再试'})

    // NavigationService.ajax(ApiConfig.Login, {
    //   login: userName,
    //   password: password,
    // }, {
    //   onSuccess: ((resp) => {
    //     onSuccess && onSuccess(resp)
    //   })
    // })
  }

  const handleBlur = () => {
    userNameRef.current && userNameRef.current.blur()
    passwordRef.current && passwordRef.current.blur()
  }

  return (
    <TouchableWithoutFeedback onPress={handleBlur}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.headerLogo} source={logo}/>
          <Text style={styles.headerSystemName}>数据大屏终端{Config.version}</Text>
        </View>
        <View style={styles.body}>

          <View key={'account-from'}>
            <EleInput
              ref={userNameRef}
              style={styles.formInput}
              placeholder='应用账号'
              name='userName'
              value={userName}
              bordered={false}
              keyboardType='number-pad'
              onChange={setUserName}
            />

            <ElePassword
              ref={passwordRef}
              style={styles.formInput}
              placeholder='安全码'
              name='password'
              maxLength={16}
              minLength={8}
              value={password}
              keyboardType='number-pad'
              onChange={setPassword}
            />
          </View>

          <EleButton type='primary' style={styles.submit} onPress={handleCommit}>
            <Text style={styles.submitTxt}>登录</Text>
          </EleButton>
        </View>

        <View style={styles.footer}>
          <Text>技术支持：成都钛安科技有限公司</Text>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    paddingTop: 60,
    minHeight: 100,
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
  headerLogo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  headerSystemName: {
    fontSize: 28,
    // color: 'rgba(0,0,0,.8)',
    color: colors.primaryColor,
    textAlign: 'center',
  },

  body: {
    height: 320,
    paddingTop: 100,
  },

  footer: {
    flex: 1,
    minHeight: 40,
    paddingVertical: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  formInput: {
    marginTop: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.secondColor,
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: 14,
    fontSize: 16,
    height: device.isBigger ? 46 : 40,
  },

  submit: {
    backgroundColor: colors.primaryColor,
    borderColor: colors.primaryColor,
    borderRadius: 6,
    marginTop: 29,
    marginHorizontal: 20,
  },

  submitTxt: {
    fontWeight: '700',
  },

})

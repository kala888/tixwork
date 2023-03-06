import React from 'react'
import Dashboard from './dashboard';
import {isEmpty} from '@/nice-router/nice-router-util';
import useRemoteUrl from './use-remote-url';
import LoginPage from '@/pages/home/login';
// import {Button} from '@ant-design/react-native';

export default function HomePage({navigation}) {
  // const {url, saveUrl, clear} = useRemoteUrl();
  const {url, saveUrl} = useRemoteUrl();
  if (isEmpty(url)) {
    return <LoginPage onSuccess={saveUrl}/>
  }
  return (
    <>
      {/*<Button onPress={clear}>退出</Button>*/}
      <Dashboard navigation={navigation} src={url}/>
    </>
  )
}

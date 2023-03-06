import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import Config from '@/nice-router/nice-router.config'
import FormItem from '@/components/form/form-item'
import EleTextarea from '@/components/form/field/ele-textarea'
import device from '@/nice-router/device'
import { Button } from '@ant-design/react-native'
import GlobalToast from '@/nice-router/global-toast'
import { isEmpty } from '@/nice-router/nice-router-util'

const EnvConfig = {
  prod: {
    code: 'prod',
    title: '',
    url: 'https://prod.tiandtech.com/',
  },
  test: {
    code: 'test',
    title: '测',
    url: 'https://test.tiandtech.com/',
  },

  others: {
    code: 'others',
    title: '其他',
  },
}

export function getRemoveEnv(): {
  code: string,
  title: string,
  url?: string,
} {
  if (isEmpty(Config.baseURL) || Config.baseURL.startsWith(EnvConfig.prod.url)) {
    return EnvConfig.prod
  }
  if (Config.baseURL.startsWith(EnvConfig.test.url)) {
    return EnvConfig.test
  }
  return EnvConfig.others
}

export default function AppConfigPage() {
  const [currentUrl, setCurrentUrl] = useState(Config.baseURL)

  useEffect(() => {
    setCurrentUrl(Config.baseURL)
  }, [])

  const changeBaseUrl = (url) => {
    Config.baseURL = url
    setCurrentUrl(url)
    GlobalToast.show({ text: '临时修改已生效' })
  }

  // @ts-ignore
  // @ts-ignore
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>

        <FormItem label='当前URL:' inline={false}>
          <EleTextarea value={currentUrl} onChange={setCurrentUrl} />
        </FormItem>

        {/*@ts-ignore*/}
        <Button style={styles.button} type='primary' onPress={() => changeBaseUrl(currentUrl)}>确认修改地址</Button>
        {/*@ts-ignore*/}
        <Button style={styles.button} onPress={() => changeBaseUrl(EnvConfig.local.url)}>
          使用田波机器
        </Button>
        {/*@ts-ignore*/}
        <Button style={styles.button} onPress={() => changeBaseUrl(EnvConfig.test.url)}>
          使用测试环境
        </Button>
        {/*@ts-ignore*/}
        <Button style={styles.button} onPress={() => changeBaseUrl(EnvConfig.prod.url)}>
          使用生产
        </Button>

      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    height: device.height,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 20,
  },
})

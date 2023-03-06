import React from 'react'
import { BackHandler, StyleSheet, Text } from 'react-native'
import StorageTools from '@/nice-router/storage-tools'
import colors from '@/utils/colors'
import { Modal, Portal } from '@ant-design/react-native'
import NavigationService from '@/nice-router/navigation-service'
import { ApiConfig } from '@/utils/config'
import device from '@/nice-router/device'

const AGREEMENT = 'privacy-agreement'

export default function PrivacyAgreementCheck() {
  if (device.ios) {
    return
  }
  let popup
  const close = () => Portal.remove(popup)

  const handleViewUserTerms = () => {
    NavigationService.view(ApiConfig.Terms)
    close()
  }

  const handleViewPrivacyTerms = () => {
    NavigationService.view(ApiConfig.PrivacyTerms)
    close()
  }

  const handleConfirm = () => {
    StorageTools.set(AGREEMENT, true)
    close()
  }

  const handleCancel = () => {
    BackHandler.exit()
  }

  const actions = [
    {
      text: '暂不使用',
      onPress: handleCancel,
      style: { color: colors.textColorLighter },
    },
    {
      text: '同意',
      onPress: handleConfirm,
      style: { color: colors.primaryColor },
    },
  ]

  const content = (
    <Text style={styles.container}>
      请你务必审慎阅读、充分理解"服务协议"和"安全与隐私政策"各条款，
      包括但不限于：为了向您提供优质的金融服务，我们需要适时收集你的设备信息，地理位置，通讯录，身份证和人脸等个人信息。
      你可以在"设置"中查看，变更，管理你的授权。 你可以阅读
      <Text style={styles.term} onPress={() => handleViewUserTerms()}>
        《服务协议》
      </Text>
      和
      <Text style={styles.term} onPress={() => handleViewPrivacyTerms()}>
        《安全与隐私政策》
      </Text>
      了解详细信息。如果您同意，请点击 "同意" 开始接受我们的服务。
    </Text>
  )

  StorageTools.get(AGREEMENT, false).then((resp) => {
    if (!resp) {
      popup = Modal.alert('隐私协议和隐私政策', content, actions)
    }
  })
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingHorizontal: 4,
    color: colors.textColorLight,
    fontSize: 15,
    lineHeight: 20,
  },
  term: {
    color: '#53c7ca',
    fontWeight: 'bold',
  },
})

import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import device from './device'
import GenericForm, { GenericFormType } from '@/genericform/generic-form'
import { Modal } from '@ant-design/react-native'
import colors from '@/utils/colors'
import { useVisible } from '@/service/use-service'
import { isEmpty } from '@/nice-router/nice-router-util'
import NavigationService from '@/nice-router/navigation-service'
import _ from 'lodash'
import EleActionList from '@/components/elements/ele-action-list'
import ActionUtil from '@/nice-router/action-util'

export type GlobalPopupMessage = {
  title?: string
  text?: string
  closeActionText?: string
  renderText: any
  actionList?: any[]
}


export type GlobalPopupViewType = {
  title?: string,
  pageTitle?: string
} & Partial<GlobalPopupMessage> & Partial<GenericFormType>

const Layout = (props) => (
  <View style={{ height: device.height - 160, paddingBottom: 40 }}>
    <ScrollView style={styles.content}>
      {props.children}
    </ScrollView>
    <View>
      {props.footer}
    </View>
  </View>
)


const MessageTips = (props) => {
  const { text, actionList = [], closeActionText = '关闭', onClose } = props
  const cancelButton = actionList.find(it => it.code === 'cancel')

  let list: any[] = actionList
  if (!cancelButton) {
    list = _.concat([{ title: closeActionText }], actionList)
  }

  const theActionList = list.map((it) => ({
      ...it,
      onPress: () => {
        if (it.onPress) {
          it.onPress()
          onClose()
          return
        }
        if (it.ajax) {
          NavigationService.ajax(it)
          onClose()
          return
        }
        if (ActionUtil.isActionLike(it)) {
          NavigationService.view(it)
        }
        onClose()
      },
    }),
  )
  return (
    <View style={{ height: device.height * 0.5, paddingBottom: 40, paddingTop: 10 }}>
      <ScrollView style={styles.content}>
        <Text style={styles.contentText}>{text}</Text>
      </ScrollView>
      <View style={{ paddingTop: 10 }}>
        <EleActionList items={theActionList} />
      </View>
    </View>
  )
}
export default function GlobalPopupView(props: GlobalPopupViewType) {
  const { visible, close } = useVisible(true)
  const title = props.title || props.pageTitle || '提示'
  let type = 'form'
  if (isEmpty(props.fieldList) && isEmpty(props.groupList)) {
    type = 'message'
  }

  return (
    <Modal
      style={{ paddingTop: 10 }}
      title={title}
      transparent
      closable
      onClose={close}
      visible={visible}
      maskClosable
    >
      {
        type === 'message' && <MessageTips {...props} onClose={close} />
      }
      {
        // @ts-ignore
        type === 'form' && <GenericForm {...props} layout={Layout} onSubmitSuccess={close} />
      }

    </Modal>
  )
}


const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: colors.borderColor,
    minHeight: 100,
  },
  contentText: {
    fontSize: 16,
    color: colors.textColor,
  },
})

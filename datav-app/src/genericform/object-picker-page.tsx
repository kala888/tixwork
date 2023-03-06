import React, { useEffect } from 'react'
import NavigationService from '@/nice-router/navigation-service'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { LoadingType } from '@/nice-router/nice-router-util'
import ListofPageBase from '@/listof/listof-page-base'

import { useRoute } from '@react-navigation/native'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import EleActionList from '@/components/elements/ele-action-list'
import device from '@/nice-router/device'
import { units } from '@/utils'
import { usePageTitle, useVisible } from '@/service/use-service'
import { Modal } from '@ant-design/react-native'
import Listof from '@/listof/listof'
import colors from '@/utils/colors'

function ObjectPickerPage() {
  const { visible, show, close } = useVisible()
  // @ts-ignore
  const root = useSelector((state) => state.objectPicker)

  usePageTitle(root,'选择')
  // q如果变化了，就发送一个后台请求
  const { linkToUrl, onGoBack } = useRoute().params || {} as any
  useEffect(() => {
    if (linkToUrl) {
      NavigationService.ajax(
        linkToUrl,
        {},
        {
          loading: LoadingType.Modal,
        },
      )
    }
    return () => NavigationService.dispatch('objectPicker/clear')
  }, [linkToUrl])

  const { selectedItems = [], inbound = {} } = root || {}
  const { list = [], maxSelectCount } = inbound

  const handleCommit = async () => {
    onGoBack && onGoBack(selectedItems)
    NavigationService.back()
  }


  const theList = list.map((it) => ({
    ...it,
    checked: _.findIndex(selectedItems, { id: it.id }) > -1,
  }))

  const handleShow = () => {
    if (selectedItems.length > 0) {
      show()
    }
  }

  const actionList = [
    { id: 'object-action-1', title: `已选 ${selectedItems.length}`, onPress: handleShow },
    { id: 'object-action-2', title: '确定', onPress: handleCommit },
  ]
  return (
    <ListofPageBase
      {...inbound}
      list={theList}
      displayMode='object-picker'
      renderFooter={() => (
        <View style={styles.footer}>
          <EleActionList items={actionList} />
          <Modal
            popup
            visible={visible}
            animationType='slide-up'
            onClose={close}
          >
            <View style={styles.popupView}>
              <View style={styles.popupViewTitle}>
                <View styles={{ flex: 1 }}>
                  <Text>已选择{selectedItems.length}，最多可选{maxSelectCount}</Text>
                </View>
                <TouchableOpacity onPress={close}><Text style={styles.closeAction}>关闭</Text></TouchableOpacity>
              </View>
              <ScrollView>
                <Listof list={selectedItems} displayMode='object-picker-popup' emptyMessage='还没有选择！' />
              </ScrollView>
            </View>
          </Modal>
        </View>
      )}
    />
  )
}

export default ObjectPickerPage
const styles = StyleSheet.create({
  container: {
    height: device.height - 80,
  },
  footer: {
    height: 80,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
  },

  popupViewTitle: {
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: colors.borderColor,
  },
  closeAction: {
    fontSize: 20,
    color: colors.textColorLighter,
  },
  popupView: {
    height: 80 * units.vh,
    backgroundColor: '#fff',
  },
})

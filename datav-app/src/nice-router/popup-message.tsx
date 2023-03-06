import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import _ from 'lodash'
import { Overlay } from 'teaset'
import device from './device'
import NavigationService from './navigation-service'
import EleActionList from '@/components/elements/ele-action-list'
import { units } from '@/utils'
import colors from '@/utils/colors'
import { ActionListLike } from '@/nice-router/nice-router-types'
import TopView from 'teaset/components/Overlay/TopView'

export type PopupMessageProps = {
  title?: string
  text?: string
  closeActionText?: string
  renderText: any
} & ActionListLike;

export default class PopupMessage extends React.PureComponent {
  static globalView = null
  static close: () => void
  static show: (props: PopupMessageProps) => void

  render() {
    return (
      // @ts-ignore
      <TouchableOpacity onPress={() => PopupMessage.show(this.props)}>
        {this.props.children}
      </TouchableOpacity>
    )
  }
}
PopupMessage.close = () => {
  if (PopupMessage.globalView) {
    // @ts-ignore
    PopupMessage.globalView.close()
  }
}

PopupMessage.show = (props: PopupMessageProps) => {
  const {
    title,
    text,
    renderText,
    actionList: theActionList = [],
    closeActionText = '关闭',
  } = props
  const cancelButton = theActionList.find(it => it.code === 'cancel')
  let list: any[] = theActionList
  if (!cancelButton) {
    list = _.concat([{ title: closeActionText }], theActionList)
  }

  const actionList = list.map((it, index) => ({
      ...it,
      textStyle: { color: '#000' },
      style: {
        flex: 1,
        borderColor: 'rgba(111,111,111,0.5)',
        borderLeftWidth: index > 0 ? 1 : 0,
        zIndex: 99999999,
      },
      onPress: () => {
        if (it.onPress) {
          it.onPress()
          PopupMessage.close()
          return
        }
        if (it.ajax) {
          NavigationService.ajax(it)
          PopupMessage.close()
          return
        }

        NavigationService.view(it)
        PopupMessage.close()
      },
    }),
  )

  const overlayView = (
    <Overlay.PopView
      style={{ alignItems: 'center', justifyContent: 'center' }}
      modal={false}
      overlayOpacity={0.7}
      ref={(v) => {
        PopupMessage.globalView = v
      }}
    >
      <View style={styles.container}>
        <View header style={styles.title}>
          <Text style={styles.titleText}>
            {title}
          </Text>
        </View>
        {renderText && renderText()}

        <View style={styles.content}>
          <Text style={styles.contentText}>{text}</Text>
        </View>
        <EleActionList items={actionList} />
      </View>
    </Overlay.PopView>
  )
  TopView.removeAll()
  Overlay.show(overlayView)
}


const styles = StyleSheet.create({
  container: {
    width: device.width - 40,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 6,
    minHeight: 40 * units.vh,
  },
  title: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleText: {
    fontSize: 24,
    color: colors.textColor,
  },
  content: {
    minHeight: 100,
  },
  contentText: {
    fontSize: 16,
    color: colors.textColor,
  },
  footer: {
    paddingTop: 20,
  },
})

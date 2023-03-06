import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Portal } from '@ant-design/react-native'
import GlobalPopupView, { GlobalPopupViewType } from './global-popup-view'


export default class GlobalPopup extends React.PureComponent {
  static key: any = null
  static close: () => void
  static show: (props: GlobalPopupViewType) => void

  render() {
    return (
      // @ts-ignore
      <TouchableOpacity onPress={() => GlobalPopup.show(this.props)}>
        {this.props.children}
      </TouchableOpacity>
    )
  }
}

GlobalPopup.close = () => {
  if (GlobalPopup.key) {
    Portal.remove(GlobalPopup.key)
  }
}

GlobalPopup.show = (props: GlobalPopupViewType) => {
  GlobalPopup.key = Portal.add(<GlobalPopupView {...props} />)
}

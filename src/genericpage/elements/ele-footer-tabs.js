import Taro from '@tarojs/taro'
import { AtTabBar } from 'taro-ui'
import NavigationService from '@/nice-router/navigation.service'
import m_ from '@/utils/mini-lodash'

export default class EleFooterTabs extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }
  static defaultProps = {
    tabs: [],
  }

  state = {
    selectedIndex: null,
  }

  selectTab = (value) => {
    this.setState(
      {
        selectedIndex: value,
      },
      () => {
        const { tabs, onClick } = this.props
        const selected = tabs[value]
        if (onClick) {
          onClick(selected)
          return
        }
        NavigationService.view(selected)
      }
    )
  }

  render() {
    const { tabs } = this.props
    const current = this.state.selectedIndex !== null ? this.state.selectedIndex : m_.findIndex(tabs, 'selected')
    const tabList = tabs.map((it) => ({
      ...it,
      image: it.imageUrl,
    }))

    return <AtTabBar fixed tabList={tabList} onClick={this.selectTab} current={current} />
  }
}

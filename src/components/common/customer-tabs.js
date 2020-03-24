import Taro from '@tarojs/taro'
import { AtTabs } from 'taro-ui'
import findIndex from 'lodash/findIndex'
import NavigationService from '@/nice-router/navigation.service'
import { LoadingType } from '@/nice-router/nice-router-util'

export default class CustomerTabs extends Taro.PureComponent {
  state = {
    current: null,
  }

  handelTabSwitch = (index) => {
    this.setState({ current: index }, () => {
      const { tabs = [] } = this.props
      const tab = tabs[index]
      NavigationService.ajax(
        tab,
        {},
        {
          loading: LoadingType.barLoading,
        }
      )
    })
  }

  render() {
    const { tabs = [] } = this.props
    const selectTabIndex = findIndex(tabs, 'selected')
    const selectedIndex = this.state.current || selectTabIndex
    const scroll = tabs.length > 4

    return (
      tabs.length > 0 && (
        <AtTabs
          animated={false}
          current={selectedIndex}
          scroll={scroll}
          tabList={tabs}
          onClick={this.handelTabSwitch}
        />
      )
    )
  }
}

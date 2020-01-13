import Taro from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View } from '@tarojs/components'
import CustomerTabs from '../components/common/customer-tabs'
import Listof from './listof'
import './listof.scss'

@connect(({ listofpage }) => ({ ...listofpage }))
class ListofPage extends Taro.PureComponent {
  componentDidMount() {
    const { pageTitle = '' } = this.props
    Taro.setNavigationBarTitle({ title: pageTitle })
  }

  componentWillReceiveProps(nextProps) {
    const { pageTitle: currentTitle = '' } = this.props
    const { pageTitle: nextPageTitle = '' } = nextProps
    if (currentTitle !== nextPageTitle) {
      Taro.setNavigationBarTitle({ title: nextPageTitle })
    }
  }

  render() {
    const {
      tabs,
      list,
      listMeta,
      displayMode,
      emptyMessage,
      style,
      dataContainer,
      articleList,
      articleListMeta,
    } = this.props

    return (
      <View className='listof-page'>
        <View>
          <CustomerTabs tabs={tabs} />
        </View>
        <Listof
          dataContainer={dataContainer}
          list={list || articleList}
          listMeta={listMeta || articleListMeta}
          displayMode={displayMode}
          emptyMessage={emptyMessage}
          isBigList
          height='100vh'
          style={style}
        />
      </View>
    )
  }
}
export default ListofPage

import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import NavigationService from '@/nice-router/navigation.service'
import { AtSearchBar } from 'taro-ui'
import Listof from '@/listof/listof'
import { connect } from '@tarojs/redux'

// TODO 这页面应该是一个特殊的listof
@connect(({ objectPicker }) => ({ ...objectPicker }))
class ObjectPickerPage extends Taro.PureComponent {
  static options = {
    addGlobalClass: true,
  }

  state = {
    keyword: '',
  }

  componentDidMount() {
    const { linkToUrl } = this.$router.params
    if (linkToUrl) {
      NavigationService.ajax(linkToUrl)
    }
  }

  handleItemPress = (item) => {
    NavigationService.back({ data: item }, this)
  }

  onChange = (keyword) => {
    this.setState({
      keyword,
    })
  }

  onSearchActionClick = () => {
    const { searchUrl } = this.props
    const { keyword } = this.state
    NavigationService.ajax(searchUrl, { keyword })
  }

  render() {
    const { list, listMeta, displayMode, emptyMessage, style, dataContainer, articleList, articleListMeta } = this.props

    return (
      <View className='object-picker'>
        <View className='object-picker-search-bar'>
          <AtSearchBar
            actionName='没找到，搜一下'
            value={this.state.keyword}
            onChange={this.onChange}
            onActionClick={this.onSearchActionClick}
          />
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
          onItemPress={this.handleItemPress}
        />
      </View>
    )
  }
}

export default ObjectPickerPage

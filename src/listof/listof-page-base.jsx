import { View } from '@tarojs/components'
import NavigationService from '@/nice-router/navigation.service'
import { AtButton } from 'taro-ui'
import CustomerTabs from '@/components/common/customer-tabs'
import { usePageTitle, usePullDown } from '@/service/use.service'
import Config from '@/utils/config'
import EleRichText from '@/genericpage/elements/ele-rich-text'
import { isNotEmpty } from '@/nice-router/nice-router-util'
import Listof from './listof'
import './styles.scss'

function ListofPageBase(props) {
  const { pageTitle = Config.name } = props
  usePageTitle(pageTitle)
  usePullDown(props)

  const handleFooterButtonClick = (action) => {
    NavigationService.view(action)
  }

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
    actionList,
    content, // rich-text
  } = props

  return (
    <View className='listof-page'>
      <View>
        <CustomerTabs tabs={tabs} />
      </View>
      {isNotEmpty(content) && <EleRichText content={content} />}
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

      {actionList && (
        <View className='footer-button'>
          {actionList.map((it) => {
            const { id, code, title } = it
            return (
              <View key={id + code} className='footer-button-btn'>
                <AtButton type='primary' onClick={handleFooterButtonClick.bind(this, it)}>
                  {title}
                </AtButton>
              </View>
            )
          })}
        </View>
      )}
    </View>
  )
}

ListofPageBase.options = {
  addGlobalClass: true,
}

export default ListofPageBase

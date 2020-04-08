import { useShareAppMessage } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import Config from '@/utils/config'
import { usePageTitle, usePullDown } from '@/service/use.service'

import EleFlex from './container/ele-flex'
import './styles.scss'

function GenericPageBase(props) {
  const { pageTitle = Config.name, pageLinkToUrl = Config.api.FooterHome } = props
  usePageTitle(pageTitle)
  usePullDown(props)
  // TODO 处理share进入的时候，didmount
  //
  // const { q } = this.$router.params
  // if (q) {
  //   const uri = decodeURIComponent(q)
  //   NavigationService.view(uri)
  // }

  useShareAppMessage((res) => {
    if (res.from === 'button') {
      const { target: { dataset = {} } = {} } = res
      const { share = {} } = dataset
      const { shareTitle, linkToUrl, imageUrl } = share
      const encodePath = encodeURIComponent(linkToUrl || pageLinkToUrl)
      return {
        title: shareTitle || pageTitle,
        path: `/pages/generic-page?q=${encodePath}`,
        imageUrl,
      }
    }
    const encodePath = encodeURIComponent(pageLinkToUrl)
    return {
      title: pageTitle,
      path: encodePath,
    }
  })

  const { className } = props
  const rootClass = classNames('generic-page', className)
  return (
    <View className={rootClass}>
      <EleFlex {...props} />
    </View>
  )
}

GenericPageBase.options = {
  addGlobalClass: true,
}

export default GenericPageBase

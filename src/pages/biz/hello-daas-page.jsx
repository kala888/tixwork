import FilterBar from '@/components/filter/filter-bar'
import FilterTabs from '@/components/filter/filter-tabs'
import { useAsyncEffect, useAsyncState } from '@/service/use.service'
import { View } from '@tarojs/components'
import mockFacetData from './mock-data/mock-facet-data'
import './styles.scss'

function HelloDaaSPage() {
  const [data, setData] = useAsyncState([{}])
  // init tabs
  useAsyncEffect(async () => {
    setData(mockFacetData)
  }, [])

  const { list, title, code, facetList = [] } = data
  return (
    <View>
      <FilterBar items={list} facetList={facetList} title={title} code={code} pinFirst />
      <View style={{ marginTop: '20px' }}>
        <FilterTabs items={list} pinFirst={false} />
      </View>
    </View>
  )
}

HelloDaaSPage.options = {
  addGlobalClass: true,
}
export default HelloDaaSPage

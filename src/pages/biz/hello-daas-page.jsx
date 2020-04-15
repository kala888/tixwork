import { useAsyncEffect, useAsyncState } from '@/service/use.service'
import mockFacetData from '@/components/filter/mock-facet-data'
import { View } from '@tarojs/components'
import FilterTabs from '@/components/filter/filter-tabs'
import FilterBar from '@/components/filter/filter-bar'
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

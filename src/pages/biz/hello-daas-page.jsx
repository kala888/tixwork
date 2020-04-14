import { useAsyncEffect, useAsyncState } from '@/service/use.service'
import mockFacetData from '@/components/filter/mock-face-data'
import FilterTabs from '@/components/filter/filter-tabs'
import './styles.scss'

function HelloDaaSPage() {
  const [items, setItems] = useAsyncState([])
  // init tabs
  useAsyncEffect(async () => {
    setItems(mockFacetData[0].list)
  }, [])

  return <FilterTabs items={items} />
}

HelloDaaSPage.options = {
  addGlobalClass: true,
}
export default HelloDaaSPage

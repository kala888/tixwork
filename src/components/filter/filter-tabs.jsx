import PropTypes from 'prop-types'
import FilterBar from '@/components/filter/filter-bar'
import NavigationService from '@/nice-router/navigation.service'
import { LoadingType } from '@/nice-router/nice-router-util'
import './filter-bar.scss'

function FilterTabs({ items }) {
  const onChange = (item) => NavigationService.ajax(item, {}, { loading: LoadingType.modal })
  return <FilterBar items={items} onChange={onChange} fixedFirst={false} />
}

FilterTabs.propTypes = {
  items: PropTypes.array,
}

FilterTabs.defaultProps = {
  items: [],
}

export default FilterTabs

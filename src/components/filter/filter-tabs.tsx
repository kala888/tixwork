import React from 'react'
import NavigationService from '@/nice-router/navigation-service'
import { LoadingType } from '@/nice-router/nice-router-util'
import PropTypes from 'prop-types'

import FilterBar from './filter-bar'
import './filter-bar.scss'

function FilterTabs({ items }) {
  const onChange = (item) => NavigationService.ajax(item, {}, { loading: LoadingType.modal })
  return <FilterBar items={items} onChange={onChange} max={5} pinFirst={false} bordered />
}

FilterTabs.propTypes = {
  items: PropTypes.array,
}

FilterTabs.defaultProps = {
  items: [],
}

export default FilterTabs

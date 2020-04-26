/*
 * Copyright(c) 2020 nice-router
 *    Date: 2020/4/26 下午12:05
 *    Author: Kala
 */

import NavigationBoxBar from '@/components/navigation/navigation-box-bar'
import classNames from 'classnames'
import './styles.scss'

function EleNavigationBox(props) {
  const { kids, className } = props

  const rootClass = classNames('ele-navigation-box', className)

  return <NavigationBoxBar list={kids} className={rootClass} />
}

EleNavigationBox.options = {
  addGlobalClass: true,
}

EleNavigationBox.defaultProps = {
  className: null,
  kids: [],
}

export default EleNavigationBox

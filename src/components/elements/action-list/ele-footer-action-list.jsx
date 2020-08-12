import React from 'react'
import _ from 'lodash'
import EleActionList from './ele-action-list'
import './styles.scss'

function EleFooterActionList(props) {
  const { mode = ['full'] } = props
  const theMode = _.concat(['footer'], mode)
  return <EleActionList {...props} mode={theMode} />
}

export default EleFooterActionList

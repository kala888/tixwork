import React from 'react'
import { RichText } from '@tarojs/components'
import PropTypes from 'prop-types'

function EleRichText({ content }) {
  return <RichText nodes={content} />
}

EleRichText.propTypes = {
  content: PropTypes.string,
  float: PropTypes.bool,
}

EleRichText.defaultProps = {
  content: '',
  float: false,
}

export default EleRichText

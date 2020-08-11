import React from 'react'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'

function EleRichText({ content }) {
  // return <RichText nodes={content} />
  return <View dangerouslySetInnerHTML={{ __html: content }} />
}

EleRichText.propTypes = {
  content: PropTypes.string,
}

EleRichText.defaultProps = {
  content: '',
}

export default EleRichText

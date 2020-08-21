import React from 'react'
import PropTypes from 'prop-types'
import '@tarojs/taro/html.css'
import { RichText } from '@tarojs/components'

function EleRichText({ content }) {
  return <RichText space='nbsp' nodes={content} />
  // return <View className='taro_html' dangerouslySetInnerHTML={{ __html: content }} />
}

EleRichText.propTypes = {
  content: PropTypes.string,
}

EleRichText.defaultProps = {
  content: '',
}

export default EleRichText

import { RichText } from '@tarojs/components'
import PropTypes from 'prop-types'

function EleRichText({ content, float }) {
  const regex = new RegExp('<img', 'gi')
  let nodes =
    content &&
    content.replace(
      regex,
      `<img style="max-width:100%; vertical-align:top; display:block; ${float ? 'float:left;' : ''}"`
    )

  return <RichText nodes={nodes} />
}

EleRichText.propTypes = {
  content: PropTypes.string,
  float: PropTypes.bool,
}

EleRichText.defaultProps = {
  content: '',
  float: false,
}

EleRichText.options = {
  addGlobalClass: true,
}

export default EleRichText

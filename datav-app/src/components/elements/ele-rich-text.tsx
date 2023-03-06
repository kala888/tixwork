import React from 'react'
import RenderHtml from 'react-native-render-html'

export type EleRichTextProps = {
  content?: string;
};

function EleRichText({ content = '' }: EleRichTextProps) {
  return (
    <RenderHtml source={{ html: content }} enableExperimentalMarginCollapsing={true} />
  )
}

export default EleRichText

import React from 'react'
import { View } from 'react-native'

type EleWhiteSpaceProps = {
  height: number;
  color: string;
};

function EleWhiteSpace({ height, color }: EleWhiteSpaceProps) {
  return <View style={{ height, backgroundColor: color }} />
}

EleWhiteSpace.defaultProps = {
  height: 30,
  color: '#fff',
}
export default EleWhiteSpace

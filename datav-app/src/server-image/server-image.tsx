import React from 'react'
import ImageTools, { ImageSize } from './image-tools'
import { Image, StyleSheet } from 'react-native'

export type ServerImageProps = {
  className?: string;
  src?: string;
  uri?: string;
  size?: ImageSize;
  style?: React.CSSProperties;
} & Partial<Image>;

function ServerImage(props: ServerImageProps) {
  const { mode = 'aspectFill', style, src, uri, size, ...others } = props
  const rootCls = [
    styles.container,
    style,
  ]
  const remotePath = ImageTools.getServerImagUrl(src || uri, size)


  return <Image style={rootCls} source={{ url: remotePath }} mode={mode} {...others} />
}

export default ServerImage

const styles = StyleSheet.create({
  container: {},
})


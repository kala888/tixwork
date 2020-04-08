import Qrcode from '@/components/common/qrcode'

export default function EleQrcode(props) {
  const { size, customStyle, text, bgColor, color } = props
  return <Qrcode canvasId='ele-canvas' text={text} size={size} style={customStyle} bgColor={bgColor} fgColor={color} />
}

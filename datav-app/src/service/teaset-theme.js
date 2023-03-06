import { Theme } from 'teaset'

const theme = {
  primaryColor: '#f5576f',
  backButtonTitle: '返回',
  carouselActiveDotColor: '#ffdc7f',
  pupMaxHeight: 358,
}
export default function init() {
  Theme.set(theme)
}

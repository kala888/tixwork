import colors from '@/utils/colors'
import { StyleSheet } from 'react-native'
import _ from 'lodash'

const rootStyle = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginBottom: 10,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#fff',
    flex: 1,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: colors.borderColor,
  },
  headerTitle: {
    flex: 1,
    color: colors.textColor,
  },
  headerBrief: {
    color: colors.textColor,
  },

  content: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
  },
  cover: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
  },
  coverImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  coverText: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#56585c',
  },
  coverTextContent: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  info: {
    // backgroundColor:'red',
    // height:100,
    flexDirection: 'column',
    flex: 1,
    paddingHorizontal: 8,
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  infoBrief: {
    paddingHorizontal: 5,
    paddingTop: 5,
    color: colors.textColor,
    fontSize: 14,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'column',
    borderTopColor: colors.borderColor,
    borderTopWidth: 0.5,
    flex: 1,
    width: '100%',
  },
})

const horizontalStyle = StyleSheet.create({
  content: {
    flexDirection: 'row',
  },
})
const verticalStyle = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  content: {
    flexDirection: 'column',
    padding: 0,
  },
  cover: {
    height: 175,
    width: '100%',
  },
  coverImage: {
    height: 175,
  },
  coverText: {
    height: 125,
    width: 125,
  },
  info: {
    marginTop: 5,
    paddingBottom: 10,
  },

})
const verticalSmallStyle = StyleSheet.create({
  coverImage: {
    width: 125,
    height: 125,
  },
  coverText:{
    width: 75,
    height: 75,
  }
})
const verticalNormalStyle = StyleSheet.create({
  coverImage: {
    width: 175,
    height: 175,
  },
  coverText: {
    width: 125,
    height: 125,
  },
})
const circleStyle = StyleSheet.create({
  coverImage: {
    borderRadius: 1000,
  },
  coverText: {
    borderRadius: 1000,
  },
})

const largeStyle = StyleSheet.create({
  cover: {
    height: 80,
    width: 80,
  },
  coverImage: {
    height: 80,
    width: 80,
  },
})
const smallStyle = StyleSheet.create({})
const asTextStyle = StyleSheet.create({
  coverText: {
    borderRadius: 1000,
  },
  coverTextContent: {
    fontWeight: '800',
    fontSize: 20,
  },
})
const avatarStyle = StyleSheet.create({
  coverImage: {
    borderWidth: 2,
    borderColor: colors.brandDarkColor,
    shadowColor: '#fff',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
})

const defaultStyle = StyleSheet.create({
  coverText: {
    backgroundColor: '#56585c',
  },
})
const normalStyle = StyleSheet.create({
  coverText: {
    backgroundColor: '#07c160',
  },
})
const primaryStyle = StyleSheet.create({
  coverText: {
    backgroundColor: colors.primaryColor,
  },
})
const warnStyle = StyleSheet.create({
  coverText: {
    backgroundColor: '#ffc300',
  },
})
const dangerStyle = StyleSheet.create({
  coverText: {
    backgroundColor: '#fa5151',
  },
})
const styleMapping = {
  root: rootStyle,
  horizontal: horizontalStyle,
  vertical: verticalStyle,
  'vertical-small': verticalSmallStyle,
  'vertical-normal': verticalNormalStyle,
  circle: circleStyle,
  large: largeStyle,
  small: smallStyle,
  avatar: avatarStyle,

  default: defaultStyle,
  normal: normalStyle,
  primary: primaryStyle,
  warn: warnStyle,
  danger: dangerStyle,
  'as-text': asTextStyle,
}


export const getStyle = (name, mode) => {
  const modeList = Array.isArray(mode) ? mode : [mode]
  const list: any[] = ['root'].concat(modeList)
  return list.map(it => _.get(styleMapping, `${it}['${name}']`))
}

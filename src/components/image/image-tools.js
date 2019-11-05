import Config from '@/utils/config'

// const logo = require('./images/default_id_icon.png')

function loadServerImage(uri, style) {
  if (!uri) {
    console.warn('image uri could not be', uri)
    return uri
  }
  let url = uri || ''
  if (uri && !/^(http|https):/.test(uri)) {
    if (uri.indexOf('images') === -1) {
      url = `${Config.oss.staticURL}images/${uri}`
    } else {
      url = `${Config.oss.staticUR}${uri}`
    }
  }
  if (url.indexOf('x-oss-process') > -1) {
    return url
  }
  return url + style
}

// taro 1.3以后才支持克里化
// const curriedLoadImgWithStyle = _.curryRight(loadServerImage)
// const loadTinyImg = curriedLoadImgWithStyle('?x-oss-process=style/tiny')
// const loadSmallImg = curriedLoadImgWithStyle('?x-oss-process=style/small')
// const loadMiddleImg = curriedLoadImgWithStyle('?x-oss-process=style/middle')
// const loadNormalImg = curriedLoadImgWithStyle('?x-oss-process=style/normal')
// const loadLargeImg = curriedLoadImgWithStyle('?x-oss-process=style/large')
// const loadXLargeImg = curriedLoadImgWithStyle('?x-oss-process=style/xlarge')
// const loadOriginImg = curriedLoadImgWithStyle('?x-oss-process=style/origin')
// const loadWaterfallImg = curriedLoadImgWithStyle('?x-oss-process=style/waterfall')
// const loadThumbnailImg = curriedLoadImgWithStyle('?x-oss-process=style/thumbnail')

const loadTinyImg = function(uri) {
  return loadServerImage(uri, '?x-oss-process=style/tiny')
}
const loadSmallImg = function(uri) {
  return loadServerImage(uri, '?x-oss-process=style/small')
}
const loadMiddleImg = function(uri) {
  return loadServerImage(uri, '?x-oss-process=style/middle')
}
const loadNormalImg = function(uri) {
  return loadServerImage(uri, '?x-oss-process=style/normal')
}
const loadLargeImg = function(uri) {
  return loadServerImage(uri, '?x-oss-process=style/large')
}
const loadXLargeImg = function(uri) {
  return loadServerImage(uri, '?x-oss-process=style/xlarge')
}
const loadOriginImg = function(uri) {
  return loadServerImage(uri, '?x-oss-process=style/origin')
}
const loadThumbnailImg = function(uri) {
  return loadServerImage(uri, '?x-oss-process=style/thumbnail')
}

const ImageTools = {
  loadTinyImg,
  loadSmallImg,
  loadMiddleImg,
  loadNormalImg,
  loadLargeImg,
  loadXLargeImg,
  loadOriginImg,
  loadServerImage,
  loadThumbnailImg,
}
export default ImageTools

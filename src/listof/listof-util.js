import { isNotEmpty } from '@/nice-router/nice-router-util'

const defaultImage = null

function getImageUrl(item = {}) {
  const { imageList = [], editorSuggestionImageList = [], imageUrl, coverImage } = item
  if (coverImage) {
    return coverImage
  }
  if (imageUrl) {
    return imageUrl
  }
  if (editorSuggestionImageList.length > 0) {
    return editorSuggestionImageList[0].imageUrl
  }
  if (imageList.length > 0) {
    return imageList[0].imageUrl
  }
  return defaultImage
}

function getImageList(item = {}) {
  const { imageList = [], editorSuggestionImageList = [], imageUrl } = item
  let list = []
  if (imageUrl) {
    list.push({ id: `${item.id}_imageUrl`, imageUrl })
  } else {
    list = editorSuggestionImageList.concat(imageList)
  }
  return list
}

function getItemWidth(displayMode) {
  if (['product', 'v-card'].indexOf(displayMode) > -1) {
    return 49
  }
  return 100
}

function isSelfHoldClickTemplate(displayMode, item = {}) {
  if ('card' === displayMode) {
    return isNotEmpty(item.documentUrl) || isNotEmpty(item.actionList)
  }
  return false
}

const ListofUtil = {
  getItemWidth,
  getImageList,
  getImageUrl,
  isSelfHoldClickTemplate,
}

export default ListofUtil

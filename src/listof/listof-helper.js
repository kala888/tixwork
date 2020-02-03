import m_ from '@/utils/mini-lodash'

const defaultImage = null

export function getImageUrl(item = {}) {
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

export function getImageList(item = {}) {
  const { imageList = [], editorSuggestionImageList = [], imageUrl } = item
  let list = []
  if (imageUrl) {
    list.push({ id: `${item.id}_imageUrl`, imageUrl })
  } else {
    list = m_.concat(editorSuggestionImageList, imageList)
  }
  return list
}

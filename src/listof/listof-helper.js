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
    list = editorSuggestionImageList.concat(imageList)
  }
  return list
}

const TWO_COLUMN_DISPLAY_MODE = ['product', 'image-on-top-waterfall', 'image-on-top-horizontal']

export function getNumberColumns(displayMode) {
  return TWO_COLUMN_DISPLAY_MODE.indexOf(displayMode) > -1 ? 2 : 1
}

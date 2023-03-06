import React, { useState } from 'react'
import ImageModal from '@/components/form/field/image-picker/image-modal'
import { Image, StyleSheet, View } from 'react-native'
import colors from '@/utils/colors'
import { useVisible } from '@/service/use-service'
import { TouchableOpacity } from 'react-native-gesture-handler'

export type EleImageListType = {
  items: string[] | { imageUrl: string }[]
};

function EleImageList(props: EleImageListType) {
  const { visible, close, show } = useVisible()
  const [currentView, setCurrentView] = useState()
  const { items } = props
  const handlePreview = (imageUrl) => {
    setCurrentView(imageUrl)
    show()
  }
  return (
    <View style={styles.container}>
      <ImageModal visible={visible} onClose={close} imageUrl={currentView} />
      {
        items.map((it, idx) => {
          const imageUrl = it.imageUrl || it
          return (
            <View key={idx} style={styles.imageItem}>
              <TouchableOpacity onPress={handlePreview.bind(null, imageUrl)}>
                <Image source={{ uri: imageUrl }} style={styles.img} />
              </TouchableOpacity>
            </View>
          )
        })
      }
    </View>
  )
}

export default EleImageList


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  imageItem: {
    position: 'relative',
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: colors.borderColor,
    marginBottom: 10,
    marginHorizontal: 2,
  },
  img: {
    height: 90,
    width: 90,
    resizeMode: 'cover',
  },
})

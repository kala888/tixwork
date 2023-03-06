import React from 'react'
import { Modal } from 'react-native'
import { Toast } from 'teaset'
import ImageViewer from 'react-native-image-zoom-viewer'
import { ActivityIndicator } from '@ant-design/react-native'

export default function ImageModal(props) {
  const { imageUrl, visible, onClose } = props

  return (
    <Modal visible={visible} onRequestClose={onClose} transparent>
      <ImageViewer
        imageUrls={[{ url: imageUrl }]}
        onClick={onClose}
        loadingRender={() => <ActivityIndicator />}
        onSaveToCamera={() => Toast.success('图片保存成功')}
        menuContext={{ saveToLocal: '保存到本地', cancel: '取消' }}
      />
    </Modal>
  )
}

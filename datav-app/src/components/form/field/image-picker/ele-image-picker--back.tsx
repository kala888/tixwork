import { PermissionsAndroid, Platform, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ImagePicker } from '@ant-design/react-native'
import { ImageLike } from '@/nice-router/nice-router-types'
import { isEmpty } from '@/nice-router/nice-router-util'
import uploadFiles from '@/service/file-upload/upload-files'
import _ from 'lodash'

type EleImage = { imageUrl?: string };
type ImageItem = { url?: string } & Partial<EleImage>


type EleImagePickerProps = {
  value: EleImage[] | string;
  onChange?: (imageList: ImageLike[]) => void;
  maxLength?: number;
  disabled?: boolean;
  brief?: string;
  max?: number
};

export default function EleImagePickerBack(props: EleImagePickerProps) {
  const [granted, setGranted] = useState(false)
  const [files, setFiles] = useState<ImageItem[]>([])

  const { value, max = 3, onChange } = props

  useEffect(() => {
    let sourceFile: EleImage[] = []
    if (!isEmpty(value)) {
      sourceFile = Array.isArray(value) ? value : [{ imageUrl: value }]
    }
    const defaultImages = sourceFile.filter((it) => it.imageUrl).map((it) => ({ url: it.imageUrl }))
    setFiles(defaultImages)
  }, [value])

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ],
      )
      const result = _.values(granted).filter(it => it !== PermissionsAndroid.RESULTS.GRANTED)
      if (isEmpty(result)) {
        setGranted(true)
      } else {
        setGranted(false)
      }
    } catch (err) {
      console.warn(err)
    }
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestCameraPermission().then()
    }
  }, [])

  const handleChange = (flist, op, idx) => {

    console.log('ooooooo change', flist, op, idx)
    if (op === 'add') {
      const todoList = [_.last(flist)]
      const onSuccess = (sourceFile, remoteFile) => {
        setFiles((preState) => {
          const tempList = preState.map((it) => {
            if (it.url === sourceFile) {
              return {
                url: remoteFile,
              }
            }
            return it
          })
          setFiles(tempList)
          // @ts-ignore
          onChange && onChange(tempList)
          return tempList
        })
      }

      const uploadFileOption = {
        todoList,
        onSuccess,
      }
      // @ts-ignore
      uploadFiles(uploadFileOption)
    }
    setFiles(flist)
  }

  if (Platform.OS === 'android' && !granted) {
    return <Text>需要访问相册的权限</Text>
  }

  return (
    <ImagePicker onChange={handleChange} files={files} selectable={files.length <= max} />
  )
}

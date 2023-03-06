import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ActionIcon from '@/components/action-icon'
import colors from '@/utils/colors'
import Video from 'react-native-video'
import { isEmpty } from '@/nice-router/nice-router-util'
import { launchCamera } from 'react-native-image-picker'

export default function EleVideo() {

  const [linkToUrl, setLinkToUrl] = useState<any>()

  const handleClick = () => {
    const options = {
      mediaType: 'video',
      videoQuality: 'high',
      durationLimit: 30,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }
    // @ts-ignore
    launchCamera(options, ({ assets }) => setLinkToUrl(assets))
  }
  return (
    <TouchableOpacity onPress={handleClick}>
      {
        isEmpty(linkToUrl) ? (
          <View style={styles.container}>
            <ActionIcon icon='iconfont-video' size={40} color={colors.primaryColor} />
          </View>
        ) : (
          <Video
            source={linkToUrl}
            muted={false}
            resizeMode='contain'
            repeat={false}
            style={styles.video}
          />
        )
      }

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: colors.borderColor,
    width: 80,
    height: 80,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {},
})

import ImageTools, { ImageSize } from '@/server-image/image-tools';
import ServerImage from '@/server-image/server-image';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { isNotEmpty } from '@/utils/object-utils';
import './styles.less';

function InfoImage({ imageUrl }) {
  const handleImagePreview = () => {
    if (isNotEmpty(imageUrl)) {
      const url = ImageTools.getServerImagUrl(imageUrl, ImageSize.Origin);
      Taro.previewImage({ urls: [url] });
    }
  };

  return (
    <View className='info-image' onClick={handleImagePreview}>
      <ServerImage src={imageUrl} size={ImageSize.Large} mode='widthFix' />
    </View>
  );
}

export default InfoImage;

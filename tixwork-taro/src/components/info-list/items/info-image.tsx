import ImageTools, { ImageSize } from '@/server-image/image-tools';
import ServerImage from '@/server-image/server-image';
import { View } from '@tarojs/components';
import ObjectUtils from '@/utils/object-utils';
import './styles.less';
import ImagePreview from '@/utils/image-preview';

function InfoImage({ imageUrl }) {
  const handleImagePreview = () => {
    if (ObjectUtils.isNotEmpty(imageUrl)) {
      const url = ImageTools.getServerImagUrl(imageUrl, ImageSize.Origin);
      ImagePreview.preview(url);
    }
  };

  return (
    <View className='info-image' onClick={handleImagePreview}>
      <ServerImage src={imageUrl} size={ImageSize.Large} mode='widthFix' />
    </View>
  );
}

export default InfoImage;

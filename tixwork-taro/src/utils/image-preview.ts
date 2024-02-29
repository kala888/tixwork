import Taro from '@tarojs/taro';
import ObjectUtils from '@/utils/object-utils';

const ImagePreview = {
  preview: async (urls?: string | string[]) => {
    if (ObjectUtils.isEmpty(urls)) {
      return;
    }
    const list = (Array.isArray(urls) ? urls : [urls]).map((it) => {
      if (it?.startsWith('//')) {
        return 'https:' + it;
      }
      return it;
    });
    await Taro.previewImage({ urls: list as any });
  },
};

export default ImagePreview;

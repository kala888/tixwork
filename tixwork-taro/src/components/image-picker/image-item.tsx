import { isNotEmpty } from '@/utils/object-utils';
import { Image, Text, View } from '@tarojs/components';
import './styles.less';
import ActionIcon from '@/components/action-icon/action-icon';
import Taro from '@tarojs/taro';

export type TaroImageFile = {
  /** 本地临时文件路径 */
  path: string;
  /** 本地临时文件大小，单位 B */
  size: number;
  /** 文件的 MIME 类型
   * @supported h5
   */
  type?: string;
  /** 原始的浏览器 File 对象
   * @supported h5
   */
  originalFileObj?: File;
};

type ImageItemType = {
  imageUrl?: string;
  onAdd?: (file: TaroImageFile) => void;
  onRemove?: () => void;
  disabled?: boolean;
};
export default function ImageItem(props: ImageItemType) {
  const { imageUrl = '', onAdd, onRemove, disabled } = props;

  const handlePreview = async () => await Taro.previewImage({ urls: [imageUrl] });
  const handleRemove = (e) => {
    e.stopPropagation();
    onRemove && onRemove();
  };
  const handleAdd = async () => {
    if (disabled) {
      await Taro.showModal({
        title: '提示',
        content: `该字段不可编辑`,
        showCancel: false,
      });
      return;
    }

    await Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: async function (res) {
        onAdd && onAdd(res.tempFiles[0]);
      },
    });
  };

  if (isNotEmpty(imageUrl)) {
    return (
      <View className='image-item' onClick={handlePreview}>
        <Image src={imageUrl} className='image-item--image' mode='aspectFill' />
        {!disabled && (
          <View className='image-item--remove' onClick={handleRemove}>
            <Text>移除</Text>
          </View>
        )}
      </View>
    );
  }

  return (
    <View className='image-item' onClick={handleAdd}>
      <ActionIcon icon='plus' size={40} />
    </View>
  );
}

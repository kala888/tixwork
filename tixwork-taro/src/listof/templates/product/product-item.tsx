import ServerImage from '@/server-image/server-image';
import { Text, View } from '@tarojs/components';
import ListofUtil from '../../listof-util';
import { Product } from '@/types';
import classNames from 'classnames';
import './styles.less';

function ProductItem(props: Product) {
  const { name, brand } = props;
  const src = ListofUtil.getImageUrl(props);

  const rootCls = classNames('product-item');

  return (
    <View className={rootCls}>
      <View className='product-item-cover'>
        <ServerImage className='product-item-cover-image' src={src} mode='aspectFill' />
      </View>

      <View className='product-item-info'>
        <View className='product-item-info-title'>
          {props.onSale && <Text className='product-item-info-tag'>折</Text>}
          {props.brand && <Text className='product-item-info-brand'>「{brand?.name}」</Text>}
          <Text className='product-item-info-name'>{name}</Text>
        </View>
      </View>
    </View>
  );
}

export default ProductItem;

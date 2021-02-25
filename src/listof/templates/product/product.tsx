import { isNotEmpty } from '@/nice-router/nice-router-util';
import EleTag from '@/components/elements/ele-tag/ele-tag';
import ServerImage from '@/server-image/server-image';
import { Text, View } from '@tarojs/components';
import ListofUtil from '../../listof-util';
import './styles.scss';

type ProductProps = {
  preTag: string;
  tags: string[];
  brand: string;
  name: string;
  price: number;
  imageUrl: string;
};

function Product(props: ProductProps) {
  const { preTag = '', tags = [], brand = '', name, price } = props;
  const src = ListofUtil.getImageUrl(props);

  return (
    <View className='product'>
      <View className='product-cover'>
        <ServerImage className='product-cover-image' src={src} mode='aspectFill' />
      </View>

      <View className='product-info'>
        <Text className='product-info-title'>
          <Text className='product-info-title-tag'>{preTag}</Text>
          <Text className='product-info-title-txt'> {`${brand} ${name}`}</Text>
        </Text>

        <View className='product-info-brief'>
          <Text>{`￥${price}`}</Text>
          {tags.map((it, idx) => isNotEmpty(it) && <EleTag title={it} mode='primary' size='small' />)}
        </View>
      </View>
    </View>
  );
}

export default Product;

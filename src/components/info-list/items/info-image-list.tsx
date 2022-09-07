import EleCarousel, { EleCarouselItem } from '@/components/elements/ele-carousel';
import { View } from '@tarojs/components';
import './styles.less';

type InfoImageListProps = {
  value: EleCarouselItem[];
};

function InfoImageList(props: InfoImageListProps) {
  const { value } = props;
  return (
    <View className='info-image-list'>
      <EleCarousel items={value} indicatorActiveColor='#5ebfff' customStyle={{ borderRadius: '10px' }} />
    </View>
  );
}

export default InfoImageList;

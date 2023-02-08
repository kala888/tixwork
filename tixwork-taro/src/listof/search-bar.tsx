import { View } from '@tarojs/components';
import NavigationService from '@/nice-router/navigation-service';
import './search-bar.less';
import EleSearchBar from '@/components/search-bar';

export default function SearchBar(props) {
  const params = {
    ...props,
    ...(props.extraData || {}),
  };

  const handleSearch = (keyword) => {
    NavigationService.ajax(props, { keyword });
  };
  return (
    <View className='search-bar'>
      <EleSearchBar value={props.keyword} onSearch={handleSearch} {...params} />
    </View>
  );
}

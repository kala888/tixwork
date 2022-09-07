import { View } from '@tarojs/components';
import EleTag from '@/components/elements/ele-tag/ele-tag';
import { useEffect, useState } from 'react';
import NavigationService from '@/nice-router/navigation-service';
import ApiConfig from '@/utils/api-config';
import { Current } from '@tarojs/taro';
import Listof from '@/listof/listof';
import SearchBar from '@/components/search-bar';
import './styles.less';

export default function SearchPage() {
  const [keyword, setKeyword] = useState('');
  const [items, setItems] = useState([]);
  const { search } = Current?.router?.params || {};

  const fetchData = (str) => {
    setKeyword(str);
    NavigationService.ajax(
      ApiConfig.Search,
      { keyword: str },
      {
        onSuccess: (resp) => {
          const theItems = (resp || []).map((it, idx) => {
            const content = it.replace(keyword, `<span style='color:red'>${keyword}</span>`);
            return {
              id: idx,
              content:
                '<div style="border:1px solid #ddd;margin-top:10px;padding:10px;border-radius: 4px">' +
                content +
                '</div>',
            };
          });
          setItems(theItems);
        },
      }
    );
  };

  useEffect(() => {
    if (search) {
      fetchData(search);
    }
  }, [search]);

  const handleSearch = () => fetchData(keyword);
  console.log('itemsitemsitems', items);

  const handleItemClick = () => {
    NavigationService.goPage('/pages/policy/policy-detail-page', { id: 10002 });
  };

  return (
    <View>
      <View className='search-bar'>
        <SearchBar value={keyword} onChange={setKeyword} title='搜索' onSearch={handleSearch} />
      </View>
      <View className={'tags'}>
        <EleTag mode='primary' size={'small'} onClick={() => fetchData('人才')}>
          人才
        </EleTag>
        <EleTag mode='primary' size={'small'} onClick={() => fetchData('补助')}>
          补助
        </EleTag>
        <EleTag mode='red' size={'small'} onClick={() => fetchData('军民融合')}>
          军民融合
        </EleTag>
        <EleTag mode='primary' size={'small'} onClick={() => fetchData('教育')}>
          教育
        </EleTag>
        <EleTag mode='primary' size={'small'} onClick={() => fetchData('机械加工')}>
          机械加工
        </EleTag>
      </View>

      <View className={'search-result'}>
        <Listof displayMode='rich-text' emptyMessage={'新都区审批局'} items={items} onItemClick={handleItemClick} />
      </View>
    </View>
  );
}

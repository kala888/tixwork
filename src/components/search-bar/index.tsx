import React, { useState } from 'react';
import { Input, Text, View } from '@tarojs/components';
import './styles.less';
import classNames from 'classnames';
import ActionIcon from '@/components/action-icon/action-icon';

type SearchBarCompType = {
  title?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  onSearch?: () => void;
  onChange?: (value: string) => void;
};
type SearchBarType = {
  onSearch?: (value: string) => void;
} & Omit<SearchBarCompType, 'onSearch'>;

function SearchBarComp(props: SearchBarCompType) {
  const [isFocus, setFocus] = useState(false);
  const { title = '搜索', placeholder = '搜索', value, disabled, onSearch, onChange } = props;

  const handleSearch = () => {
    onSearch && onSearch();
    setFocus(false);
  };

  const handleFocus = () => setFocus(true);
  const handleBlur = () => setFocus(false);
  const rootCls = classNames('search-bar', {
    'search-bar--focus': isFocus,
  });

  const handleChange = (e) => {
    onChange && onChange(e.target.value);
  };

  const fontSize = 14;
  const placeholderWrapStyle: React.CSSProperties = {};
  const actionStyle: React.CSSProperties = {};

  if (isFocus || (!isFocus && value)) {
    actionStyle.opacity = 1;
    actionStyle.marginRight = `0`;
    placeholderWrapStyle.flexGrow = 0;
  } else if (!isFocus && !value) {
    placeholderWrapStyle.flexGrow = 1;
    actionStyle.opacity = 0;
    actionStyle.marginRight = `-${(title.length + 1) * fontSize + fontSize / 2 + 10}px`;
  }

  const placeholderStyle: React.CSSProperties = { visibility: 'hidden' };
  if (!value?.length) {
    placeholderStyle.visibility = 'visible';
  }

  return (
    <View className={rootCls}>
      <View className='search-bar__container'>
        <View className='search-bar__placeholder-wrap' style={placeholderWrapStyle}>
          <ActionIcon icon='search' />
          <Text className='search-bar__placeholder' style={placeholderStyle}>
            {isFocus ? '' : placeholder}
          </Text>
        </View>
        <Input
          className='search-bar__input'
          confirmType='search'
          value={value}
          focus={isFocus}
          disabled={disabled}
          onInput={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>
      <View className='search-bar__action' style={actionStyle} onClick={handleSearch}>
        {title}
      </View>
    </View>
  );
}

// 为啥包一下呢？发现直接写一个，输入的时候有性能问题
export default function SearchBar(props: SearchBarType) {
  const [keyword, setKeyword] = useState<string>('');
  const handleSearch = () => {
    props.onSearch && props.onSearch(keyword);
  };
  return <SearchBarComp value={keyword} onChange={setKeyword} {...props} onSearch={handleSearch} />;
}

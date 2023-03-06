import React, { useRef, useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import ActionIcon from '@/components/action-icon'
import NavigationService from '@/nice-router/navigation-service'

export default function SearchBar(props) {
  const ref = useRef<any>()
  const [keyword, setKeyword] = useState('')
  const { title, linkToUrl, onSearch } = props
  const handleSearch = () => {
    console.log('search data', keyword)
    ref.current.blur()
    if (onSearch) {
      onSearch(keyword)
      return
    }
    NavigationService.ajax(linkToUrl, { keyword })
  }

  return (
    <View style={styles.container}>
      <TextInput
        ref={ref}
        style={styles.input}
        placeholder={title}
        value={keyword}
        onChangeText={setKeyword}
        onSubmitEditing={handleSearch}
        onBlur={handleSearch}
      />
      <TouchableOpacity style={styles.icon} onPress={handleSearch}>
        <ActionIcon icon='iconfont-search' size={26} color={'#666'} />
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  input: {
    height: 32,
    paddingTop: 0,
    paddingBottom: 0,
    width: '100%',
  },
  icon: {
    padding: 5,
    marginLeft: -40,
    alignSelf: 'center',
  },
})

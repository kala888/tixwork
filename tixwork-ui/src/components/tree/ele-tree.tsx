import IconFont from '@/components/icon-font';
import { colors } from '@/components/value-type/style-utils';
import { isEmpty, isNotEmpty } from '@/utils/object-utils';
import { CaretDownOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Empty, Input, Space, Tree } from 'antd';
import deepdash from 'deepdash';
import lodash from 'lodash';
import React, { useState } from 'react';
import styles from './styles.less';

const _ = deepdash(lodash);

export type EleTreeNodeType = {
  id: React.Key;
  title: string;
  children?: EleTreeNodeType[];
};

export type EleTreeType = {
  onSelect?: (key: React.Key, { selected, node }: { selected: boolean; node: any }) => void;
  dataSource?: EleTreeNodeType | EleTreeNodeType[];
  searchPlaceholder?: string;
};

const highLight = (str = '', key = '') => {
  if (isEmpty(key) || isEmpty(str) || str.indexOf(key) === -1) {
    return <span>{str}</span>;
  }

  const idx = str.indexOf(key);
  const prefix = str.substring(0, idx);
  const postfix = str.substring(idx + key.length);
  return (
    <span>
      <span>{prefix}</span>
      <span style={{ color: 'red' }}>{key}</span>
      <span>{postfix}</span>
    </span>
  );
};
const filter = (nodes, query) => {
  const predicate = (it) => it?.title?.indexOf(query) > -1;
  // @ts-ignore
  return _.filterDeep(nodes, predicate, { childrenPath: 'children' });
};

export default function EleTree(props: EleTreeType) {
  const [keyword, setKeyword] = useState('');
  const [filteredData, setFilteredData] = useState<EleTreeNodeType[]>([]);

  const { onSelect, dataSource = [], searchPlaceholder = '输入名称查询' } = props;

  const handleSelect = (selectedKeys, { selected, node }) => {
    const key = selectedKeys[0];
    console.log('key...', selected, key);
    if (onSelect) {
      onSelect(key, node);
    }
  };

  const handleChange = _.debounce((e) => {
    if (isEmpty(e.target.value)) {
      setKeyword('');
    }
  }, 200);

  const handleSearch = (value) => {
    setKeyword(value);
    if (isNotEmpty(value)) {
      const result = filter(dataSource, value);
      setFilteredData(result);
      return;
    }
    setFilteredData([]);
  };

  const treeData: any = isNotEmpty(keyword) ? filteredData : dataSource;

  const titleRender = (node) => {
    const { title, icon } = node;
    return (
      <Space>
        {icon && <IconFont icon={icon} style={{ color: colors.primaryColor }} />}
        {highLight(title, keyword)}
      </Space>
    );
  };
  console.log('ttttttt', treeData);
  return (
    <ProCard ghost>
      <div className={styles.search}>
        <Input.Search
          placeholder={searchPlaceholder}
          onChange={handleChange}
          onSearch={handleSearch}
        />
      </div>
      {isNotEmpty(treeData) ? (
        <Tree
          titleRender={titleRender}
          switcherIcon={<CaretDownOutlined className={styles.switchIcon} />}
          defaultExpandAll={true}
          fieldNames={{
            title: 'title',
            key: 'id',
          }}
          treeData={treeData}
          onSelect={handleSelect}
          className={styles.tree}
        />
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </ProCard>
  );
}

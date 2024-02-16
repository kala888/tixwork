import BoxWrapper from '@/components/box-wrapper/box-wrapper';
import { ProDescriptions } from '@ant-design/pro-components';
import _ from 'lodash';

const isSingleLine = (type) => _.includes(['textarea', 'ObjectList'], type);

/**
 * 把textarea弄成单独的一行
 */
const buildColumns = (columns) => {
  let theColumn = columns.filter((it) => !it.hideInDescriptions).map((it) => ({ ...it, tooltip: '' }));
  //1. 处理Id字段，在detail作为text
  if (theColumn[0].dataIndex === 'id') {
    theColumn = [{ ...theColumn[0], valueType: 'text' }].concat(theColumn.slice(1, theColumn.length));
  }
  //2.
  let globalPointer = 0;
  return theColumn.map((it, idx) => {
    // 2.1 本身是textarea
    if (isSingleLine(it.valueType)) {
      const result = { ...it, span: 3 };
      globalPointer = 0;
      if (it.valueType === 'textarea') {
        // ellipsis导致description ui有问题，临时在desc中干掉
        result.ellipsis = false;
        // result.copyable = true;
      }
      return result;
    }

    const next = theColumn[idx + 1];
    let span = 1;
    if (next && isSingleLine(next.valueType)) {
      span = 3 - globalPointer;
    }
    globalPointer = (globalPointer + 1) % 3;
    return { ...it, span };
  });
};

export default (props) => {
  const { name, column, columns, dataSource } = props;
  let theColumns = buildColumns(columns);
  // const key = groupName + '_' + idx;
  const showColumnLength = _.min([theColumns.length, column]);
  if (theColumns.length === 1 && _.get(theColumns, '[0].title') === name) {
    const col = theColumns[0];
    theColumns = [{ ...col, title: null }];
  }
  return (
    <BoxWrapper title={name !== 'default' ? name : ''}>
      <ProDescriptions dataSource={dataSource} columns={theColumns} column={showColumnLength} />
    </BoxWrapper>
  );
};

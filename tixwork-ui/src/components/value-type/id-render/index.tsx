import ObjectLink from '@/components/value-type/object/object-link';
import { ProFormText } from '@ant-design/pro-components';
import classNames from 'classnames';
import _ from 'lodash';
import styles from './styles.less';

const getShortId = (text: any) => {
  const str = _.toString(text);
  if (str.length > 10) {
    const front = str.slice(0, 4);
    const back = str.slice(-4);
    return front + '...' + back;
  }
  return str;
};

const IdRenderValueType = {
  align: 'center',
  render: (text, props) => {
    const { fieldProps } = props;
    const id = _.get(props?.record, 'id', text);
    const rootCls = classNames(styles.idRender, fieldProps?.className, 'id-render');
    const displayName = getShortId(text);
    return <ObjectLink {...fieldProps} displayName={displayName} id={id} className={rootCls} />;
  },
  renderFormItem: (__, props) => {
    const rest = _.omit(props.fieldProps, 'objectType');
    return <ProFormText formItemProps={{ className: 'customized-form-item' }} width="sm" {...rest} />;
  },
};
export default IdRenderValueType;

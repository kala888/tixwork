// function getWidth(size, columns: any[]) {
//   if (!_.isNil(size)) {
//     return StyleUtils.getSize(size);
//   }
//   // 1-8返回2列，9-12返回3，13-16返回4，大于16返回5列
//   const formColumnLength = columns.filter((it) => !it.hideInForm).length;
//   const defaultValue = _.clamp(_.ceil(formColumnLength / 4), 2, 5);
//   return StyleUtils.getSize(defaultValue);
// }
// "xs" | "sm" | "md" | "lg" | "xl"
import StyleUtils from '@/components/value-type/style-utils';

function smartLayout(props) {
  const { columns = [], size = 'small' } = props;
  //如果不是schema form的话，就返回空
  // if (colSize === 0 || isNotEmpty(layout)||width==='sm') {
  //   return {};
  // }
  if (columns.length > 10 || size === 'large') {
    const layout = props.layout || 'vertical';
    const popupWidth =
      layout === 'horizontal' ? StyleUtils.getSize(3) + 180 : StyleUtils.getSize(3);
    return {
      labelWrap: true,
      popupWidth,
      defaultItemWidth: 'sm',
      layout,
    };
  }
  const layout = props.layout || 'horizontal';
  const popupWidth = StyleUtils.getSize(2);
  return {
    popupWidth,
    defaultItemWidth: 'xl',
    labelWrap: true, // todo test
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
    layout,
  };
}

const groupColumns = (props) => {
  const { columns = [] } = props;
  const { defaultItemWidth } = smartLayout(props);
  const result: any[] = [];
  let group: any = {
    valueType: 'group',
    columns: [],
  };
  columns.forEach((it) => {
    if (it.group !== group.title) {
      group = {
        valueType: 'group',
        title: it.group,
        columns: [],
      };
      result.push(group);
    }
    group.columns.push({
      ...it,
      width: it.formItemProps?.width || it.width || defaultItemWidth,
    });
  });
  console.log('result', result);
  return result;
};

const FormUtils = {
  smartLayout,
  groupColumns,
};

export default FormUtils;

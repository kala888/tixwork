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
    const popupWidth = layout === 'horizontal' ? StyleUtils.getSize(3) + 180 : StyleUtils.getSize(3);
    return {
      // labelWrap: true,
      popupWidth,
      defaultItemWidth: 'sm',
      layout,
    };
  }
  const layout = props.layout || 'horizontal';
  const popupWidth = StyleUtils.getSize(2) + 80;
  return {
    popupWidth,
    defaultItemWidth: 'xl',
    labelWrap: true,
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
    grid: true,
    rowProps: {
      gutter: [16, 16],
    } as any,
    layout,
  };
}

const groupColumns = (props) => {
  const { columns = [] } = props;
  const { defaultItemWidth } = smartLayout(props);
  const result: any[] = [];
  let group: any = {
    title: 'this_is_a_fake_group',
  };
  columns
    .filter((it) => !it.hideInForm)
    .forEach((it) => {
      const groupName = it.group === 'default' ? '' : it.group;
      if (groupName !== group.title) {
        group = {
          valueType: 'group',
          title: groupName,
          columns: [],
        };
        result.push(group);
      }
      group.columns.push({
        ...it,
        width: it.formItemProps?.width || it.width || defaultItemWidth,
      });
    });
  return result;
};

const FormUtils = {
  smartLayout,
  groupColumns,
};

export default FormUtils;

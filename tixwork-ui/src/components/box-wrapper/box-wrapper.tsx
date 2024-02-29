import ObjectUtils from '@/utils/object-utils';
import { ProCard } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import classNames from 'classnames';

type BoxWrapperType = {
  title?: any;
  children?: any;
  className?: any;
  titleColor?: any;
  [key: string]: any;
};

const BoxWrapper = (props: BoxWrapperType) => {
  const { titleColor = '#444', title, children, ...rest } = props;
  const css = useEmotionCss(({ token }) => ({
    position: 'relative',
    marginBottom: 14,
    padding: '20px 10px 10px',
    border: '1px solid #eee',
    borderRadius: 4,
    '.box-wrapper-title': {
      position: 'absolute',
      top: -10,
      left: 30,
      minWidth: 20,
      padding: '0 5px',
      color: titleColor,
      fontWeight: 600,
      backgroundColor: '#fff',
    },
  }));
  const rootCls = classNames('box-wrapper', css, props.className);

  return (
    <ProCard ghost {...rest} className={rootCls}>
      {ObjectUtils.isNotEmpty(title) && title !== 'default' && <div className="box-wrapper-title">{title}</div>}
      {children}
    </ProCard>
  );
};
BoxWrapper.isProCard = true;
export default BoxWrapper;

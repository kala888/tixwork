import IconFont from '@/components/icon-font';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Space } from 'antd';
import _ from 'lodash';

type IconTextType = {
  icon?: string;
  deptType?: string;
  children: any;
};
export const IconText = (props: IconTextType) => {
  const css = useEmotionCss(({ token }) => ({
    '.icon-text-icon': {
      paddingLeft: 10,
      color: token.colorPrimary,
    },
  }));
  const { icon, deptType } = props;
  const theIcon = icon || _.toLower(deptType);
  return (
    <Space className={css}>
      <IconFont icon={theIcon} className="icon-text-icon" />
      {props.children}
    </Space>
  );
};

// SVG 改变不了颜色，可以去iconfont上，点击批量操作，去色
import { createFromIconfontCN } from '@ant-design/icons';
import type { IconFontProps } from '@ant-design/icons/es/components/IconFont';
import defaultSettings from '../../config/defaultSettings';

const Wrapper = createFromIconfontCN({
  scriptUrl: defaultSettings.iconfontUrl,
});

export type IconFontType = {
  icon?: string;
  name?: string;
  color?: string;
  size?: string | number;
  style?: Record<string, any>;
} & Partial<IconFontProps>;

/**
 * icon="xxx"，不需要使用前缀
 * type="icon-xxx",需要使用icon前缀
 *
 * 更新iconfont，需要修改defaultSettings.ts中的iconfontUrl
 *
 * @param props
 * @constructor
 */
export default function IconFont(props: IconFontType) {
  const { icon, name, color, size, style = {}, ...rest } = props;
  const iconName = icon || name || '';
  const theIcon = iconName?.startsWith('iconfont-') ? iconName : `iconfont-${iconName}`;
  const theStyle = {
    color: color,
    fontSize: size,
    ...style,
  };
  return <Wrapper type={theIcon} style={theStyle} {...rest} />;
}

import React from 'react';
import { Image } from '@tarojs/components';
import classNames from 'classnames';
import { isH5 } from '@/utils';
import { ImageProps } from '@tarojs/components/types/Image';
import ImageTools, { ImageSize } from './image-tools';
import './styles.less';
import ImagePreview from '@/utils/image-preview';

export type ServerImageProps = {
  className?: string;
  src?: string;
  uri?: string;
  size?: ImageSize | number;
  previewable?: boolean;
  customStyle?: React.CSSProperties;
} & Partial<ImageProps>;

function ServerImage(props: ServerImageProps) {
  const { previewable, mode = 'aspectFill', className, src, uri, size, customStyle = {}, ...others } = props;
  const rootCls = classNames('server-image', className, {
    // 'server-image--h5': isH5() && (mode === 'widthFix' || mode === 'heightFix'),
    'server-image--h5': isH5(),
  });
  const remotePath = ImageTools.getServerImagUrl(src || uri, size);

  const onClick = (e: any) => {
    const previewUrl = ImageTools.getServerImagUrl(src || uri, ImageSize.Origin);
    e.stopPropagation();
    e.preventDefault();
    ImagePreview.preview(previewUrl);
  };
  return (
    <Image
      onClick={previewable ? onClick : undefined}
      className={rootCls}
      style={customStyle}
      src={remotePath}
      mode={mode}
      {...others}
    />
  );
}

export default ServerImage;

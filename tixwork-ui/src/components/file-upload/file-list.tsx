import ActionIcon from '@/components/elements/action-icon';
import PDFView from '@/components/pdf';
import FileTypeUtils from '@/services/file-type-utils';
import ObjectUtils from '@/utils/object-utils';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Image, Popover, Space } from 'antd';

type FileType = {
  linkToUrl: string;
  fileSuffix?: string;
};

export type FileListType = {
  items: string[] | FileType[];
  width?: number;
  itemStyle?: React.CSSProperties;
};

export function FileList(props: FileListType) {
  const { items, width = 40, itemStyle = [] } = props;
  const imgCls = useEmotionCss((token) => ({
    maxHeight: width,
    objectFit: 'cover',
    borderRadius: 2,
    ...itemStyle,
  }));
  if (ObjectUtils.isEmpty(items)) {
    return null;
  }

  return (
    <Space>
      {items.map((it, index) => {
        const url = it.linkToUrl || it.imageUrl || it.url || it;
        const fileType = FileTypeUtils.getFileTypeBySuffix(it);
        if (fileType === 'image') {
          return <Image key={index + url} width={width} src={url} className={imgCls} />;
        }
        const icon = FileTypeUtils.getFileIconByType(fileType);
        const fileName = url.substring(url.lastIndexOf('/') + 1);
        if (fileType === 'pdf') {
          return (
            <PDFView
              key={index + icon}
              source={url}
              trigger={
                <>
                  <ActionIcon key={index + icon} icon={icon} size={15} />
                  {fileName}
                </>
              }
            />
          );
        }
        return (
          <Popover key={index + url} className={'flex-center'} content="点击下载">
            <a rel="noreferrer" href={url} target="_blank" style={{ cursor: 'pointer' }}>
              <ActionIcon key={index + icon} icon={icon} size={15} />
              {fileName}
            </a>
          </Popover>
        );
      })}
    </Space>
  );
}

import { Image, Space } from 'antd';

export type ImagUploadType = {
  items?: string[];
  width?: number;
};

export default function EleImageList(props: ImagUploadType) {
  const { items = [], width = 60 } = props;
  return (
    <Space>
      {items.map((imageUrl, index) => {
        const key = index + imageUrl;
        return (
          <Image
            key={key}
            width={width}
            src={imageUrl}
            style={{
              maxHeight: width,
              objectFit: 'cover',
            }}
          />
        );
      })}
    </Space>
  );
}

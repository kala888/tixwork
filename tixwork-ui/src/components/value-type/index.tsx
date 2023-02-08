import ImageList from '@/components/value-type/image-list';
import SingleImage from '@/components/value-type/image-list/single-image';
import RemoteRadio from '@/components/value-type/remote-enum/remote-radio';
import type { ProFieldValueType, ProSchema } from '@ant-design/pro-components';
import ActionList from './action-list';
import Department from './department';
import IconText from './icon-text';
import IdRender from './id-render';
import Mobile from './mobile';
import NickName from './nick-name';
import Object from './object';
import QRCode from './qrcode';
import RemoteEnum from './remote-enum';
import Tag from './tag';

type PartialRecord<K extends string | number | symbol, T> = { [P in K]?: T };

//1. 再ts类型，防止ts报错, 自定的valueType都用大驼峰吧，区分一下
export type CustomerValueType =
  | 'Department'
  | 'NickName'
  | 'IconText'
  | 'Tag'
  | 'ActionList'
  | 'Mobile'
  | 'Object'
  | 'QRCode'
  | 'IdRender'
  | 'Image'
  | 'ImageList'
  | 'RemoteRadio'
  | 'RemoteEnum';

export type EleValueType = CustomerValueType | ProFieldValueType;

//2. 先注入"组件"到elements，，注意这不是真的组件，而是valueType
const elements: PartialRecord<EleValueType, ProSchema> = {
  Department,
  NickName,
  IconText,
  Tag,
  ActionList,
  Mobile,
  Object,
  QRCode,
  IdRender,
  Image: SingleImage,
  ImageList,
  RemoteRadio,
  RemoteEnum,
};

export default elements;

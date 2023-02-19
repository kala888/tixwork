import ImageListValueType from '@/components/value-type/image-list';
import SingleImage from '@/components/value-type/image-list/single-image';
import type { ProColumnType, ProFieldValueType, ProSchema } from '@ant-design/pro-components';
import DepartmentValueType from './department';
import IconTextValueType from './icon-text';
import IdRenderValueType from './id-render';
import MobileValueType from './mobile';
import NickNameValueType from './nick-name';
import ObjectValueType, { ObjectListValueType } from './object';
import OptionActionsValueType from './option-actions';
import QRCodeValueType from './qrcode';
import TagValueType from './tag';

import { RemoteCascadeValueType, RemoteEnumValueType, RemoteRadioValueType } from './remote';

type PartialRecord<K extends string | number | symbol, T> = { [P in K]?: T };
export type BizColumnType = { group?: string } & ProColumnType<any, EleValueType>;

//1. 再ts类型，防止ts报错, 自定的valueType都用大驼峰吧，区分一下
export type CustomerValueType =
  | 'Department'
  | 'NickName'
  | 'IconText'
  | 'Tag'
  | 'OptionActions'
  | 'Mobile'
  | 'Object'
  | 'ObjectList'
  | 'QRCode'
  | 'IdRender'
  | 'Image'
  | 'ImageList'
  | 'RemoteRadio'
  | 'RemoteEnum'
  | 'RemoteCascade';

export type EleValueType = CustomerValueType | ProFieldValueType;

//2. 先注入"组件"到elements，，注意这不是真的组件，而是valueType
const elements: PartialRecord<EleValueType, ProSchema> = {
  Department: DepartmentValueType,
  NickName: NickNameValueType,
  IconText: IconTextValueType,
  Tag: TagValueType,
  OptionActions: OptionActionsValueType,
  Mobile: MobileValueType,
  Object: ObjectValueType,
  ObjectList: ObjectListValueType,
  QRCode: QRCodeValueType,
  IdRender: IdRenderValueType,
  Image: SingleImage,
  ImageList: ImageListValueType,
  RemoteRadio: RemoteRadioValueType,
  RemoteEnum: RemoteEnumValueType,
  RemoteCascade: RemoteCascadeValueType,
};

export default elements;

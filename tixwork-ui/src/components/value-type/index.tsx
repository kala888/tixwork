import type { ProColumnType, ProFieldValueType, ProSchema } from '@ant-design/pro-components';
import DepartmentValueType from './department';
import IdRenderValueType from './id-render';
import MobileValueType from './mobile';
import NickNameValueType from './nick-name';
import OptionActionsValueType from './option-actions';
import TagValueType from './tag';
import { IconTextValueType, ProMultipleTextLineValueType } from './text';

import {
  FileListValueType,
  FileValueType,
  ImageListValueType,
  SingleImageValueType,
} from '@/components/value-type/file';
import { ObjectValueType } from './object/object-link';
import { ObjectListValueType } from './object/object-list';
import { RemoteCascadeValueType, RemoteEnumValueType, RemoteRadioValueType, RemoteSelectValueType } from './remote';
import { RichTextValueType } from './rich-text';

type PartialRecord<K extends string | number | symbol, T> = { [P in K]?: T };
export type BizColumnType = { group?: string } & ProColumnType<any, EleValueType>;

//1. 再ts类型，防止ts报错, 自定的valueType都用大驼峰吧，区分一下
export type CustomerValueType =
  | 'Department'
  | 'NickName'
  | 'IconText'
  | 'TextList'
  | 'Tag'
  | 'OptionActions'
  | 'Mobile'
  | 'Object'
  | 'ObjectList'
  | 'IdRender'
  | 'Image'
  | 'ImageList'
  | 'RemoteRadio'
  | 'RemoteEnum'
  | 'RemoteSelect'
  | 'Uid'
  | 'RichText'
  | 'File'
  | 'FileList'
  | 'RemoteCascade';

export type EleValueType = CustomerValueType | ProFieldValueType;

//2. 先注入"组件"到elements，，注意这不是真的组件，而是valueType
const elements: PartialRecord<EleValueType, ProSchema> = {
  Department: DepartmentValueType,
  NickName: NickNameValueType,
  IconText: IconTextValueType,
  TextList: ProMultipleTextLineValueType,
  Tag: TagValueType,
  OptionActions: OptionActionsValueType,
  Mobile: MobileValueType,
  Object: ObjectValueType,
  ObjectList: ObjectListValueType,
  IdRender: IdRenderValueType,
  Image: SingleImageValueType,
  ImageList: ImageListValueType,
  File: FileValueType,
  FileList: FileListValueType,
  RemoteRadio: RemoteRadioValueType,
  RemoteEnum: RemoteEnumValueType,
  RemoteSelect: RemoteSelectValueType,
  RemoteCascade: RemoteCascadeValueType,
  RichText: RichTextValueType,
};

export default elements;

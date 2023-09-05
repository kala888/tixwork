import type { BaseType } from 'antd/es/typography/Base';
import type React from 'react';

export interface ImageLike {
  imageUrl?: string;
}

export interface ImageListLike {
  imageList?: ImageLike[];
}

export interface IconLike {
  icon?: string;
}

export interface VideoLike {
  videoUrl?: string;
}

export type ResourceLike = {
  list: ActionLike;
  get: ActionLike;
  /**
   * 支持 insert or update
   */
  save: ActionLike;
  /**
   * 支持put方法
   */
  update: ActionLike;
  remove: ActionLike;
  importData: ActionLike;
  exportData: ActionLike;
  search: ActionLike;
};

export interface ActionLike {
  id?: React.Key;
  code?: string;
  title?: string | React.ReactElement;
  type?: 'view' | 'import' | 'export' | string;
  level?: BaseType;
  ajax?: boolean;

  linkToUrl?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  onClick?: (data?: any, action?: ActionLike) => void;
  onChange?: () => void;
  disabled?: boolean;
  hidden?: boolean;
  statInPage?: boolean;
  extraData?: { confirmText?: string } & Record<string, any>;
  //直接UI相关
  render?: (record?: any, action?: ActionLike) => React.ReactElement | null;
}

export interface ModeClass {
  mode?: string | string[];
  className?: string;
}

export interface EleObject {
  id?: string;
  value?: string;
  title?: string;
  brief?: string;
}

// title就是name  ,id就是值，就是value
export interface CandidateValue extends EleObject {
  selected?: boolean;
}

export interface TitleValue {
  title?: any;
  value?: any;
}

export type ActionList = ActionLike[];

import { EleButtonProps } from '@/components/elements/ele-button';
import React from 'react';
import LoadingType from '@/nice-router/loading-type';

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

export interface ActionLike {
  code?: string;
  linkToUrl?: string;
  onClick?: Function;
  onChange?: Function;
  extraData?: any;
  disabled?: boolean;
  statInPage?: boolean;
}

export interface ModeClass {
  mode?: string | string[];
  className?: string;
}

export interface EleObject {
  id?: React.Key;
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

export interface ActionListLike {
  actionList: EleButtonProps[];
}

export type RouterPayload = {
  method?: 'put' | 'post' | 'get';
  statInPage?: boolean; //前台标记为ajax, 页面不动
  params?: Record<string, any>; //请求参数
  asForm?: boolean; // post 数据时候把json转换为字符串 formData="{...}" 形式提交给后台
  onSuccess?: (resp: any, data: any) => void;
  loading?: LoadingType;
  navigationMethod?: NavigationMethodType;
  arrayMerge?: 'replace' | 'append';
  dataRefresh?: boolean; // 如果想页面刷：发送的是ajax，但是数据不错merge

  // headers = {}, // 请求header
};

type NiceRouterState = {
  latestRoute?: string;
};

//  push='navigateTo'
//  replace='redirectTo'
//  back='navigateBack'
//  switchType='switchTab'
//  reLaunch='reLaunch';
type NavigationMethodType = 'push' | 'replace' | 'back' | 'reLaunch' | 'switchTab';

// 约定：pagePath 就是定义在app.config中的页面名称或者路径, 不再使用pageName, 沿用Taro叫法
// 约定：uri或者url就是：协议 + pathPath + 参数，不再使用path之类

type NavigationOptionType = {
  delayCallBack?: boolean;
} & RouterPayload;

type PageHistoryType = {
  pagePath: string;
  callback?: (data: Record<string, any>) => void; //后退时候传递参数的函数
};

type RouteFunction = (
  action: string | ActionLike | object,
  params?: Record<string, any>,
  options?: NavigationOptionType
) => Promise<any> | null;

type StoreDataPayload = {
  navigationOption?: {
    statInPage?: boolean;
    arrayMerge?: 'replace' | 'append';
    dataRefresh?: boolean;
    viewHashString?: string;
  };
  [key: string]: any;
};

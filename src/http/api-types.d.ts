// @ts-ignore
/* eslint-disable */

import { NavigationMethodType } from '@/nice-router/nice-router-types';

declare namespace API {
  type Status = 'ENABLED' | 'DISABLED';
  type YesOrNo = 'Y' | 'N';

  //对应后台的WebResult
  export type WebResult<T = any> = {
    code: number;
    msg: string;
    data: T;
    responseOptions: {
      // 移动端特殊字段
      xClass?: string;
      xNavigationMethod?: NavigationMethodType;
      headers?: any;
      success?: boolean;
    };
  };

  // /**
  //  * 经过简单处理的Response
  //  * 其中responseData是接口直接返回的数据，有可能是WebResult，有可能是其他的Map或者Class对象。
  //  * <br/>
  //  * 所以用这个对象的时候如果返回的是WebResult,可能会遇到: <b>const items = resp.responseData.data || []</b>;
  //  * <br/>
  //  * 其中resp.responseData取出接口返回的数据，resp.data取出webResult的data
  //  */
  // type CustomResponse<T = any> = {
  //
  // };

  type Toast = {
    toast: string;
    duration: number;
  };

  type ProfileInfo = {
    user: any;
    roleGroup: string;
    postGroup: string;
    roles: string[];
    permissions: string[];
    unreadCount?: number;
  };

  type TableDataInfo<T> = {
    total: number;
    rows: T[];
  };

  type TreeSelect = {
    id: string;
    label: string;
    icon: string;
    children?: TreeSelect[];
  };

  type SuccessResponse<T> = {
    code: number;
    msg: string;
    data: T;
    total?: number;
    rows?: T;
  };
}

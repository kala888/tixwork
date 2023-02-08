// @ts-ignore
/* eslint-disable */

declare namespace API {
  type Status = 'ENABLED' | 'DISABLED';
  type YesOrNo = 'Y' | 'N';

  //对应后台的WebResult
  export type WebResult<T = any> = {
    code: number;
    msg: string;
    data: T;
  };

  type Toast = {
    toast: string;
    duration: number;
  };

  type ProfileInfo = {
    user: API.User;
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

  type CaptchaImage = {
    uuid: string;
    img: string;
    captchaOnOff?: boolean;
  };
  type User = {
    userId: number;
    deptId: number;
    userName: string;
    nickName: string;
    email: string;
    mobile: string;
    gender: string;
    avatar: string;
    openid?: any;
    unionid?: any;

    status: Status;
    delFlag: string;
    loginIp: string;
    loginDate: string;
    createBy: string;
    createTime: string;
    updateBy?: any;
    updateTime?: any;
    remark: string;
    dept: Dept;
    roles: Role[];
    posts: Post[];
    roleIds?: any;
    postIds?: any;
    roleId?: any;
    admin: boolean;
  };
  // type LoginProfile={
  //   permissions?: string[];
  //   unreadCount?: number;
  //   user?: User;
  // }&Partial<User>

  type Dept = {
    id: number;
    parentId: number;
    ancestors?: any;
    name: string;
    sortOrder: number;
    leader: string;
    phone?: any;
    email?: any;
    deptType: 'group' | 'company' | 'department';
    status: Status;
    delFlag?: any;
    parentName?: any;
    createBy?: any;
    createTime?: any;
    updateBy?: any;
    updateTime?: any;
    children: Dept[];
  };

  type Role = {
    roleId: number;
    roleName: string;
    roleKey: string;
    roleSort: number;
    dataScope: string;
    menuCheckStrictly: boolean;
    deptCheckStrictly: boolean;
    status: Status;
    delFlag?: any;
    createBy?: any;
    createTime?: any;
    updateBy?: any;
    updateTime?: any;
    remark?: any;
    flag: boolean;
    menuIds?: any;
    deptIds?: any;
    admin: boolean;
  };

  type AjaxResult = {
    code: number | string;
    msg: string;
    data: any;
  };

  export interface Post {
    postId: number;
    postCode: string;
    postName: string;
    postSort: string;
    status: Status;
    createBy: string;
    createTime: string;
    updateBy: string;
    updateTime?: any;
    remark: string;
    flag: boolean;
  }

  type LoginResult = {
    token: string;
    loginSuccess: boolean;
    callbackUrl: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    rememberMe?: boolean;
    type?: string;
    uuid: string;
  };

  type Routers = {
    name: string;
    path: string;
    hidden: boolean;
    redirect: string;
    component: string;
    query: string;
    alwaysShow: boolean;
    meta?: any;
    children?: Routers;
  }[];

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type SuccessResponse<T> = {
    code: number;
    msg: string;
    data: T;
    total?: number;
    rows?: T;
  };

  type Menu = {
    id: React.Key;
    icon: string;
    title: string;
    component: string;
    redirect: string;
    children: Menu[];
    extraData: any;
    disabled?: boolean;
    menuType: 'FOLDER' | 'MENU' | 'FUNC';
  };

  type DictionaryType = {
    dictId: number;
    dictName: string;
    dictType: string;
    status: Status;
  };
  type DictionaryData = {
    dictCode: number;
    dictSort: number;
    dictLabel: string;
    dictValue: string;
    dictType: string;
    cssClass: string;
    listClass: string;
    isDefault: boolean;
    status: Status;
    datetime?: string;
    remark: string;
  };

  type Dict = {
    id: number;
    label: string;
    code: string;
    value?: string;
    type: 'VALUE' | 'GROUP';
    dataScope: 'PRIVATE' | 'PUBLIC' | 'SYSTEM';
    status: Status;
    sortOrder: number;
    isDefault?: YesOrNo;
    remark?: string;
    parent?: Dict;
    valueList?: Dict[];
  };

  type Notice = {
    noticeId: number;
    noticeTitle: string;
    noticeType: '1' | '2'; //（1通知 2公告）
    noticeContent: string;
    remark: string;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: Status;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}

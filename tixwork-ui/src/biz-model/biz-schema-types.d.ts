import type { BizColumnType } from '@/components/value-type';
import type React from 'react';

declare namespace BizSchemaTypes {
  export type ActionType = {
    title: string;
    type: 'import' | 'view' | string;
    linkToUrl: string;
  };

  export type ResourceDefine = {
    name: string;
    label: string;
    linkToUrl: string;
    actionList?: ActionType[];
    columns: BizColumnType[];
    listProps?: BizColumnType[];
    tableConfig: {
      rowKey?: string;
      search?: false;
      options?: false;
      toolBarRender?: false;
      lineActionList?: false;
      [key: string]: any;
    };
  };

  type BaseEntity = {
    id?: React.Key; //'ID'
    createBy?: string; //'创建者'
    updateBy?: string; //'更新者'
    createTime?: string; //'创建时间'
    updateTime?: string; //'更新时间'
  };

  export type ProjectInfo = BaseEntity & {
    projectName: string; // 项目名称
    projectDescription?: string; // 项目简介
    companyDescription?: string; // 企业简介
    totalInvestment: number; // 投资额（亿元）
    industryChain?: string; // 产业链领域
    industryChainLevel?: string; // 产业链地位
    processStatus?: string; // 进展状态
    processBrief?: string; // 进展情况
    city?: string; // 企业所在地（城市）
    ownerRegion: string; // 责任区（市）县
    projectManager?: string; // 项目经理
    reviewrRate?: string; // 初审评级
    projectLevel?: string; // 项目等级
    processUpdate?: string; // 进展更新
    brief?: string; // 备注
  };

  export type VisitRecord = BaseEntity & {
    visitDate: string; // 时间
    companyName: string; // 企业名称
    visitUser?: string; // 拜访高层职务姓名
    visitCity?: string; // 拜访城市
    companyType?: string; // 企业类别
    industryChain?: string; // 产业领域
    industryChainLevel?: string; // 产业链地位
    processState?: string; // 促进情况
    contactType?: string; // 对接方式
    contactResult?: string; // 对接成效
    projectInfo?: string; // 获取项目信息
    bigProject?: boolean; // 是否重大及高能级项目
    leaderType?: string; // 带队领导级别
    leaderName?: string; // 人员职务姓名
    ownerRegion: string; // 责任区（市）县
    pushStatus?: string; // 共同促进情况
    brief?: string; // 备注
  };

  export type CompanyContact = BaseEntity & {
    title: string; // 姓名
    companyName?: string; // 企业名称
    job?: string; // 职务
    seniorManager?: boolean; // 高管
    mobile?: string; // 手机号
    email?: string; // 电子邮件
    addressProvince?: string; // 所在省份
    addressCity?: string; // 所在城市
    address?: string; // 详细地址
    industryType?: string; // 产业类别
    source?: string; // 来源
    brief?: string; // 备注
  };

  export type GovernmentAffairsLocation = BaseEntity & {
    affairsType?: string; // 类别
    title: string; // 点位名称
    description?: string; // 点位简介
    city: string; // 城市
    address?: string; // 地址
    contact?: string; // 联系人
    brief?: string; // 备注
  };

  export type Hotel = BaseEntity & {
    city: string; // 城市
    region: string; // 区域
    title: string; // 酒店名称
    phone?: string; // 订房电话
    contact?: string; // 联系人
    contactMobile?: string; // 联系电话
    address?: string; // 营业地址
    hotelRate?: string; // 等级评价
    brief?: string; // 备注
  };

  export type Restaurant = BaseEntity & {
    city: string; // 城市
    region: string; // 区域
    title: string; // 餐厅
    menuType: string; // 菜系
    restaurantSpecial: string; // 特色
    restaurantType?: string; // 接待分类
    phone?: string; // 订餐电话
    address?: string; // 营业地址
    brief?: string; // 备注
  };
}

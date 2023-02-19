import type { BizColumnType } from '@/components/value-type';
import type React from 'react';

declare namespace BizSchemaTypes {
  export type ActionType = {
    title?: string;
    code: 'import' | 'export' | 'create' | string;
    linkToUrl?: string;
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

  // 产业链领域
  export type IndustryChain =
    | 'JCDL' //集成电路
    | 'XXXS' //新型显示
    | 'GDRJ' //高端软件
    | 'CXY' //创新药
    | 'GDYLQX' //高端医疗器械
    | 'HKFDJ' //航空发动机
    | 'GYWRJ' //工业无人机
    | 'GDJT' //轨道交通
    | 'XNYQC' //新能源汽车
    | 'XXCL' //新型材料
    | 'DSJCY' //大数据产业
    | 'RGZN' //人工智能
    | 'JRY' //金融业
    | 'HZY' //会展业
    | 'WLY' //物流业
    | 'WCY' //文创业
    | 'LYY' //旅游业
    | 'XDZY' //现代种业
    | 'LSSP' //绿色食品
    | 'LSDTCY' //绿色低碳产业
    | 'XDSM' //现代商贸
    | 'ZNZD'; //智能终端

  // 产业链级别
  export type IndustryChainLevel =
    | 'HEADER' //链主
    | 'PART'; //链属

  // 产业类别
  export type IndustryType =
    | 'DZXX' //电子信息
    | 'ZBZZ' //装备制造
    | 'YYJK' //医药健康
    | 'XXCL' //新型材料
    | 'LSSP' //绿色食品
    | 'XDFUY' //现代服务业
    | 'OTHERS'; //其它

  // 责任区域
  export type OwnerRegion =
    | 'TFXQ' //天府新区
    | 'DBXQ' //东部新区
    | 'GXQ' //高新区
    | 'JJQ' //锦江区
    | 'QYQ' //青羊区
    | 'JNQ' //金牛区
    | 'WHQ' //武候区
    | 'CHQ' //成华区
    | 'JKQ' //经开区
    | 'QBJQ' //青白江区
    | 'XDQ' //新都区
    | 'WJQ' //温江区
    | 'SLQ' //双流区
    | 'PDU' //郫都区
    | 'XJQ' //新津区
    | 'JYS' //简阳市
    | 'DJYS' //都江堰市
    | 'PZS' //彭州市
    | 'QLS' //邛崃市
    | 'CZS' //崇州市
    | 'JTX' //金堂县
    | 'DYX' //大邑县
    | 'PJX' //蒲江县
    | 'OTHERS'; //其他

  // 企业类别
  export type CompanyType =
    | 'SJ500' //世界500强
    | 'ZG500' //中国500强
    | 'FW500' //中国服务业500强
    | 'MY500' //中国民营500强
    | 'MR500' //美欧日500强
    | 'XJJ500' //新经济500强
    | 'HYLJ' //行业领军
    | 'JGSH' //机构、商协会
    | 'OTHERS'; //其他

  // 政务点位类别
  export type GovernmentAffairsType =
    | 'KJCX' //科技创新
    | 'ZHCS' //智慧城市
    | 'BWBG' //保稳保供
    | 'GYSL' //工业上楼
    | 'GYCS'; //公园城市

  // 进展状态
  export type ProcessStatus =
    | 'EARLY' //前期洽谈
    | 'NEGOTIATION' //实质洽谈
    | 'PRECONTRACT' //促进签约
    | 'CONTRACTED'; //已签约

  // 对接方式
  export type ContactType =
    | 'SMBF' //上门拜访
    | 'CJHD' //参加活动
    | 'XSLX'; //线上联系

  // 对接成效
  export type ContactResult =
    | 'CBGT' //初步沟通，建立联系
    | 'HQXX' //获取企业投资项目信息
    | 'SZQT' //实质洽谈
    | 'FRKC' //赴蓉实地考察
    | 'QDHT'; //签订合作协议

  // 领导级别
  export type LeaderType =
    | 'SJLD' //市委市政府市人大市政协领导
    | 'SJFZ' //副市级领导
    | 'SGZZ' //市管正职
    | 'SGFZ' //市管副职
    | 'SGZC' //市管中层
    | 'QGZZ' //区管正职
    | 'QGFZ' //区管副职
    | 'OTHERS'; //其他

  // 共同促进情况
  export type PushStatus =
    | 'SJ' //推荐市级主要领导上门促进
    | 'FSJ' //推荐副市级领导上门促进
    | 'SJBM' //市级部门正职共同促进
    | 'SJFBM' //市级部门副职共同促进
    | 'SJZC' //市级部门中层共同促进
    | 'SZZY' //深圳办共同促进（主要促进）
    | 'SZCY' //深圳办共同促进（参与促进）
    | 'TDZY' //团队共同促进（主要促进）
    | 'TDCY'; //团队共同促进（参与促进）

  // 初审评级
  export type ReviewrRate =
    | 'A' //A
    | 'B' //B
    | 'C' //C
    | 'D'; //D

  // 项目等级
  export type ProjectLevel =
    | 'A' //一级
    | 'B' //二级
    | 'C'; //三级

  // 等级评价
  export type HotelRate =
    | 'A' //A
    | 'B' //B
    | 'C'; //C

  // 接待分类
  export type RestaurantType =
    | 'BUSINESS' //商务
    | 'SPECIAL'; //特色

  export type ProjectInfo = BaseEntity & {
    // 项目信息
    projectName: string; // 项目名称
    projectDescription?: string; // 项目简介
    companyDescription?: string; // 企业简介
    totalInvestment: number; // 投资额（亿元）
    industryChain: IndustryChain; // 产业链领域
    industryChainLevel: IndustryChainLevel; // 产业链地位
    processStatus: ProcessStatus; // 进展状态
    processBrief?: string; // 进展情况
    city?: string; // 企业所在地（城市）
    ownerRegion: OwnerRegion; // 责任区（市）县
    projectManager?: string; // 项目经理
    reviewrRate: ReviewrRate; // 初审评级
    projectLevel: ProjectLevel; // 项目等级
    processUpdate?: string; // 进展更新
    brief?: string; // 备注
  };

  export type VisitRecord = BaseEntity & {
    // 招商拜访情况
    visitDate: string; // 时间
    companyName: string; // 企业名称
    visitUser?: string; // 拜访高层职务姓名
    visitCity?: string; // 拜访城市
    companyType: CompanyType; // 企业类别
    industryChain: IndustryChain; // 产业领域
    industryChainLevel: IndustryChainLevel; // 产业链地位
    processState?: string; // 促进情况
    contactType: ContactType; // 对接方式
    contactResult: ContactResult; // 对接成效
    projectInfo?: string; // 获取项目信息
    bigProject?: boolean; // 是否重大及高能级项目
    leaderType: LeaderType; // 带队领导级别
    leaderName?: string; // 人员职务姓名
    ownerRegion: OwnerRegion; // 责任区（市）县
    pushStatus: PushStatus; // 共同促进情况
    brief?: string; // 备注
  };

  export type CompanyContact = BaseEntity & {
    // 企业联络信息
    title: string; // 姓名
    companyName?: string; // 企业名称
    job?: string; // 职务
    seniorManager?: boolean; // 高管
    mobile?: string; // 手机号
    email?: string; // 电子邮件
    addressProvince?: string; // 所在省份
    addressCity?: string; // 所在城市
    address?: string; // 详细地址
    industryType: IndustryType; // 产业类别
    source?: string; // 来源
    brief?: string; // 备注
  };

  export type GovernmentAffairsLocation = BaseEntity & {
    // 政务点位
    affairsType: GovernmentAffairsType; // 类别
    title: string; // 点位名称
    description?: string; // 点位简介
    city: string; // 城市
    address?: string; // 地址
    contact?: string; // 联系人
    brief?: string; // 备注
  };

  export type Hotel = BaseEntity & {
    // 接待酒店
    city: string; // 城市
    region: string; // 区域
    title: string; // 酒店名称
    phone?: string; // 订房电话
    contact?: string; // 联系人
    contactMobile?: string; // 联系电话
    address?: string; // 营业地址
    hotelRate: HotelRate; // 等级评价
    brief?: string; // 备注
  };

  export type Restaurant = BaseEntity & {
    // 接待餐厅
    city: string; // 城市
    region: string; // 区域
    title: string; // 餐厅
    menuType: string; // 菜系
    restaurantSpecial: string; // 特色
    restaurantType: RestaurantType; // 接待分类
    phone?: string; // 订餐电话
    address?: string; // 营业地址
    brief?: string; // 备注
  };
}

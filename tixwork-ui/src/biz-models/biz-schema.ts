import { CommonRule } from '@/components/value-type/common-column';
import type { ResourceDefine } from '@/schema/schema-types';
import { sysTenant, sysUser } from '@/schema/sys-schema';
import _ from 'lodash';

// IMPORTANT: 这个是自动生成的，不要修改。。。。
// IMPORTANT: 这个是自动生成的，不要修改。。。。
// IMPORTANT: 这个是自动生成的，不要修改。。。。

console.log('load rules', CommonRule);

const schemas = {
  sysUser,
  sysTenant,
};

export type ResourceNameType = any;

const BizSchema = {
  Root: {
    //当前项目信息
    title: 'Tixwork',
    logo: '/logo.svg',
    name: 'tixwork',
    brief: '起源传统，超越未来',
    owner: '钛安科技',
    slogan: 'Get your software right',
  },
  ...schemas,
  get: (name) => (schemas[_.camelCase(name)] || {}) as ResourceDefine,
};

export default BizSchema;

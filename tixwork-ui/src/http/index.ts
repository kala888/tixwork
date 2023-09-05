import ApiConfig from '@/http/api-config';
import type { API } from '@/http/api-types';
import Q from '@/http/http-request/q';

//多个地方共享的就扔这吧
//登录用户信息
export const getProfile = () => Q.get<API.ProfileInfo>(ApiConfig.profile, {}, { skipErrorHandler: true });
// 查询部门下拉树结构
export const getDepartmentTree = () => Q.get<API.Dept>('/api/system/dept/tree');

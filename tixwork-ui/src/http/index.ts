import ApiConfig from '@/http/api-config';
import Q from '@/http/http-request/q';

//多个地方共享的就扔这吧

//登录用户信息
export const getProfile = () => Q.get<API.ProfileInfo>(ApiConfig.profile);

// 查询部门下拉树结构
export const getDepartmentTree = () => Q.get<API.Dept>('/api/system/dept/tree');

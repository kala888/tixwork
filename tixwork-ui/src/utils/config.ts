import BizSchema from '@/biz-models/biz-schema';

const Config = {
  baseURL: '//',
  getClientId: () => {
    return BizSchema.Root?.clientId || 'abd6143de793ceff8485c5c4b2cd9c7e';
  },
};
export default Config;

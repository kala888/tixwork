import _ from 'lodash';
import { isEmpty } from '@/nice-router/nice-router-util';

const imageList = [
  'https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-1.png',
  'https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-2.jpg',
  'https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-3.jpg',
  'https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-4.jpg',
  'https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-5.jpg',
];

const MockDataCache = {};
const mockResp = (uri = '', xClass, data) => {
  const key = uri.toLowerCase().trim();
  MockDataCache[key] = {
    xClass,
    success: true,
    data,
  };
};

const getMockResp = async (uri = '') => {
  return new Promise((resolve) => {
    const resp = MockDataCache[uri.toLowerCase().trim()];
    if (isEmpty(resp)) {
      resolve(resp);
      return;
    }
    // 这里可以测试delay和异常
    setTimeout(() => resolve(resp), 200);
  });
};

const MockService = {
  mockResp,
  getMockResp,
  randomImage: () => _.sample(imageList),
  defaultImage: imageList[2],
};

// 凑活用
export default MockService;

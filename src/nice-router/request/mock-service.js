import sample from 'lodash/sample'

const MockDataCache = {}

const mockResp = (uri, data) => {
  MockDataCache[uri] = data
}
const getMockResp = (uri) => {
  return MockDataCache[uri]
}

const randomImage = () => {
  return sample([
    'https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-1.png',
    'https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-2.jpg',
    'https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-3.jpg',
    'https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-4.jpg',
    'https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-5.jpg',
  ])
}
const MockService = {
  mockResp,
  getMockResp,
  randomImage,
}
// 凑活用
export default MockService

import _ from 'lodash'

const imageList = [
  'https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-1.png',
  'https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-2.jpg',
  'https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-3.jpg',
  'https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-4.jpg',
  'https://nice-router.oss-cn-chengdu.aliyuncs.com/avatar-5.jpg',
]

const MockDataCache = {}
const mockResp = (uri = '', xclass, data) => {
  const key = uri.toLowerCase().trim()
  const value = {
    xclass,
    success: true,
    data,
  }
  MockDataCache[key] = value
}
const MockService = {
  mockResp,
  getMockResp: (uri = '') => MockDataCache[uri.toLowerCase().trim()],
  randomImage: () => _.sample(imageList),
  defaultImage: imageList[2],
}
// 凑活用
export default MockService

const MockDataCache = {}

const mockResp = (uri, data) => {
  MockDataCache[uri] = data
}
const getMockResp = (uri) => {
  return MockDataCache[uri]
}
const MockService = {
  mockResp,
  getMockResp,
}
// 凑活用
export default MockService

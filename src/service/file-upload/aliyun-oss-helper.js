import Base64 from './base64'
import Crypto from './crypto'
import './hmac'
import './sha1'

function getAliyunConfig(ossToken = {}) {
  const { accessKeyId, accessKeySecret, securityToken } = ossToken

  const policyText = {
    // "expiration": ossConfig.expiration,
    expiration: new Date(Date.now() + 60000).toISOString(),
    conditions: [
      ['content-length-range', 0, 20 * 1024 * 1024], // 设置上传文件的大小限制,5mb
      { bucket: ossToken.bucket },
    ],
  }
  const policy = Base64.encode(JSON.stringify(policyText))
  const bytes = Crypto.HMAC(Crypto.SHA1, policy, accessKeySecret, { asBytes: true })
  const signature = Crypto.util.bytesToBase64(bytes)
  return {
    policy,
    Signature: signature,
    signature,
    OSSAccessKeyId: accessKeyId,
    'x-oss-security-token': securityToken,
    success_action_status: '200',
  }
}

export default getAliyunConfig

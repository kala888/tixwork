import Taro from '@tarojs/taro';
import ApiConfig from '@/utils/api-config';
import AuthTools from '@/utils/auth-tools';
import Config from '@/utils/config';
import ObjectUtils from '@/utils/object-utils';

type OSSResponse = {
  data: {
    fileName: string;
    url: string;
  };
};
const uploadFile = async (file: string) => {
  Taro.showLoading({ title: '上传中' });
  const token = await AuthTools.getTokenAsync();
  const header = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Bearer ${token}`,
    clientid: Config.clientId,
  };
  try {
    const resp = await Taro.uploadFile({
      url: Config.baseURL + ApiConfig.upload,
      filePath: file,
      name: 'file',
      formData: {},
      header,
    });
    const result = ObjectUtils.parseToObject(resp.data) as OSSResponse;
    return result?.data;
  } catch (err) {
    console.log(err);
    Taro.showToast({
      title: `上传失败: ${JSON.stringify(err)}`,
      icon: 'none',
      duration: 2 * 1000,
    });
  } finally {
    Taro.hideLoading();
  }
};
export default uploadFile;

import { isEmpty, isNotEmpty } from '@/utils/object-utils';
import ApiConfig from '@/utils/api-config';
import { formatTime, isH5 } from '@/utils';
import Taro from '@tarojs/taro';
import mime from 'mime';
import getAliyunConfig, { OssTokenDTO } from './aliyun-oss-helper';
import Q from '@/http/q';
import { TaroImageFile } from '@/components/image-picker/image-item';

export type FileUploadType = {
  file: TaroImageFile;
  onProgress: any;
  onStart?: Function;
  onComplete?: Function;
  onSuccess?: (remoteFile: string) => void;
  onFail?: (err: any) => void;
};

let ossToken: OssTokenDTO;

function checkTokenPass(): boolean {
  if (isNotEmpty(ossToken) && isNotEmpty(ossToken.expiration)) {
    const expr = new Date(ossToken.expiration);
    // 5分钟提前量
    return expr.valueOf() < Date.now() - 1000 * 300;
  }
  return false;
}

function getFileName(filePath = '', fileType) {
  const randomFileName = formatTime(Date.now(), 'yyyyMMddhhmmss_') + (Math.random() * 1000000 + 100000).toFixed();
  let suffix = '';
  if (isH5()) {
    // @ts-ignore
    suffix = mime.getExtension(fileType);
  } else {
    const startPos = filePath.lastIndexOf('.');
    const enPos = filePath.length;
    suffix = filePath.substring(startPos + 1, enPos);
  }
  return `${randomFileName}.${suffix}`;
}

const uploadToRemote = async (params: FileUploadType) => {
  const { file, onProgress, onStart, onComplete, onSuccess, onFail } = params;
  const { type = 'qiniu', uploadPrefix = '', prefix = '', userHome = '' } = ossToken;

  let formParam: any = { token: ossToken.securityToken };
  if (type === 'aliyun') {
    formParam = getAliyunConfig(ossToken);
  }

  if (onStart) {
    onStart(file.path);
  }

  // @ts-ignore
  const fileName = getFileName(file.path, file.type);

  const key = `${userHome}/${fileName}`;
  await Taro.showLoading({ title: '上传凭证中' });

  const uploadTask = Taro.uploadFile({
    url: uploadPrefix || prefix,
    filePath: file.path,
    name: 'file',
    formData: {
      key,
      ...formParam,
    },
    // @ts-ignore
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    success: (resp) => {
      console.log('upload file result', resp);
      const remoteFile = prefix + '/' + key;
      if (onSuccess) {
        onSuccess(remoteFile);
      }
    },
    fail: (err) => {
      Taro.showToast({
        title: `上传失败: ${JSON.stringify(err)}`,
        icon: 'none',
        duration: 2 * 1000,
      });
      if (onFail) {
        onFail(err);
      }
    },
    complete: (res) => {
      console.log('complete', res);
      Taro.hideLoading();
      if (onComplete) {
        onComplete();
      }
    },
  });
  if (onProgress) {
    uploadTask.progress(onProgress);
  }
};

const uploadFile = async (params: FileUploadType) => {
  if (isEmpty(params?.file?.path)) {
    console.warn('nothing to upload!');
    return;
  }

  if (!checkTokenPass()) {
    console.log('invalidate token, get new one');
    const resp = await Q.get(ApiConfig.OSSToken);
    ossToken = resp.data;
  }
  await uploadToRemote(params || {});
};

export default uploadFile;

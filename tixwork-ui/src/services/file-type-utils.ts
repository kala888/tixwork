export type FileType = 'image' | 'video' | 'audio' | 'pdf' | 'word' | 'excel' | 'ppt' | 'file';

const getFileTypeByMime = (mime): FileType => {
  if (mime.startsWith('image')) {
    return 'image';
  }
  if (mime.startsWith('video')) {
    return 'video';
  }
  if (mime.startsWith('audio')) {
    return 'audio';
  }
  if (mime.startsWith('application/pdf')) {
    return 'pdf';
  }
  if (mime.startsWith('application/msword')) {
    return 'word';
  }
  if (mime.startsWith('application/vnd.ms-excel')) {
    return 'excel';
  }
  if (mime.startsWith('application/vnd.ms-powerpoint')) {
    return 'ppt';
  }
  return 'file';
};

const getFileTypeBySuffix = (file): FileType => {
  const name = file?.suffix || file.linkToUrl || file.url || file || '';
  const suffix = name.split('.').pop();

  if (
    suffix.endsWith('png') ||
    suffix.endsWith('jpg') ||
    suffix.endsWith('jpeg') ||
    suffix.endsWith('gif') ||
    suffix.endsWith('svg')
  ) {
    return 'image';
  }
  if (suffix.endsWith('mp4') || suffix.endsWith('avi') || suffix.endsWith('rmvb') || suffix.endsWith('rm')) {
    return 'video';
  }
  if (suffix.endsWith('mp3') || suffix.endsWith('wav')) {
    return 'audio';
  }
  if (suffix.endsWith('pdf')) {
    return 'pdf';
  }
  if (suffix.endsWith('doc') || suffix.endsWith('docx')) {
    return 'word';
  }
  if (suffix.endsWith('xls') || suffix.endsWith('xlsx')) {
    return 'excel';
  }
  if (suffix.endsWith('ppt') || suffix.endsWith('pptx')) {
    return 'ppt';
  }
  return 'file';
};

const getFileIconByType = (type: FileType): string => {
  switch (type) {
    case 'image':
      return 'iconfont-image';
    case 'video':
      return 'iconfont-video';
    case 'audio':
      return 'iconfont-audio';
    case 'pdf':
      return 'iconfont-pdf';
    case 'word':
      return 'iconfont-word';
    case 'excel':
      return 'iconfont-excel';
    case 'ppt':
      return 'iconfont-ppt';
    default:
      return 'iconfont-file';
  }
};

const FileTypeUtils = {
  getFileTypeBySuffix,
  getFileIconByType,
  getFileTypeByMime,
};
export default FileTypeUtils;

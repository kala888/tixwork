import GlobalToast, { GlobalToastProps } from '@/components/global-popup/global-toast';
import GlobalPopup, { PopupMessageProps } from '@/components/global-popup';
import ObjectUtils from '@/utils/object-utils';

function showToastOrPopup({ toast, popup }: { toast: GlobalToastProps; popup: PopupMessageProps }): void {
  // 后端说Toast
  if (ObjectUtils.isNotEmpty(toast)) {
    GlobalToast.show({ ...toast, icon: 'none' });
  }
  // 后端说Popup
  if (ObjectUtils.isNotEmpty(popup)) {
    GlobalPopup.show(popup);
  }
}

const ResponseError = async (chain) => {
  const { requestParams } = chain;
  const { silent } = requestParams;
  const resp: API.CustomResponse = await chain.proceed(requestParams);
  const data = resp?.data as any;
  if (!silent) {
    showToastOrPopup({
      toast: data?.toast,
      popup: data?.popup,
    });
  }
  return resp;
};

export default ResponseError;

import Q from '@/http/q';
import ApiConfig from '@/utils/api-config';
import Taro from '@tarojs/taro';
import ObjectUtils from '@/utils/object-utils';

const WechatPayUtils = {
  pay: async (order: number) => {
    return new Promise(async (resolve, reject) => {
      const resp = await Q.get(ApiConfig.getPayInfo, { id: order });
      const payInfo = resp.data;
      if (ObjectUtils.isEmpty(payInfo)) {
        return;
      }
      Taro.requestPayment({
        timeStamp: payInfo.timeStamp,
        nonceStr: payInfo.nonceStr,
        signType: payInfo.signType,
        package: payInfo.packageValue,
        paySign: payInfo.paySign,
        async success(res) {
          await Taro.showToast({
            title: '支付完成',
            icon: 'none',
            duration: 1000,
          });
          Taro.showModal({
            title: '支付结果',
            content: '是否确认支付成功？',
            success: async (modalRes) => {
              if (modalRes.confirm) {
                const payResult = await Q.get(ApiConfig.getPayResult, { id: order });
                if (payResult.data === true) {
                  Taro.showToast({ title: '支付成功', icon: 'none' });
                  resolve(res);
                }
              }
            },
            complete: () => {
              resolve(res);
            },
          });
        },
        async fail(res) {
          await Taro.showToast({
            title: '支付失败',
            icon: 'none',
            duration: 1000,
          });
          reject(res);
        },
      });
    });
  },
};

export default WechatPayUtils;

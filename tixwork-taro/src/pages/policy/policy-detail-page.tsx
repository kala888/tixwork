import { Image, View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import NavigationService from '@/nice-router/navigation-service';
import { Current } from '@tarojs/taro';
import ApiConfig from '@/utils/api-config';
import PolicySection from './policy-section';
import './styles.less';
import logo from '../../assets/logo.png';

export default function SearchPage() {
  const [root, setRoot] = useState<any>({});
  const { id } = Current?.router?.params || {};

  useEffect(() => {
    if (id) {
      NavigationService.ajax(
        ApiConfig.Detail,
        { id },
        {
          onSuccess: (res) => {
            setRoot(res);
          },
        }
      );
    }
  }, [id]);

  return (
    <View className={'policy-preview'}>
      <View className={'preview-logo'}>
        <Image src={logo} className={'preview-logo-image'} />
      </View>

      <View className={'policy-preview-title'}>{root?.title || '办事指南'}</View>
      <View className={'policy-preview-content'}>
        <PolicySection title='一、政策依据' content={root?.policyBasis} />
        <PolicySection title='二、申请条件' content={root?.applyCondition} />
        <PolicySection title='三、申请时间' content={root?.applyTime} />
        <PolicySection title='四、资助标准' content={root?.criteria} />
        <PolicySection title='五、申请材料' content={root?.material} />
        <PolicySection title='六、受理部门' content={root?.receivingDepartment} />
        <PolicySection title='七、业务主管部门' content={root?.competentDepartment} />
        <PolicySection title='八、受理时间' content={root?.receivingTime} />
        <PolicySection title='九、办理时限' content={root?.processingTimeFrame} />
        <PolicySection title='十、办理流程' content={root?.processingStep} />
      </View>
    </View>
  );
}

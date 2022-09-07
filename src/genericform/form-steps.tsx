import NavigationService from '@/nice-router/navigation-service';
import { View } from '@tarojs/components';

import { CandidateValue } from '@/nice-router/nice-router-types';
import Steps from '@/components/steps';
import './styles.less';

type FormStepsProps = {
  steps: CandidateValue[];
};

function FormSteps({ steps }: FormStepsProps) {
  const handleChange = (__, value) => {
    NavigationService.view(
      value,
      {},
      {
        navigationMethod: 'replace',
      }
    );
  };

  let selectedIdx = steps.findIndex((it) => it.selected);
  return (
    <View className='form-steps'>
      <Steps items={steps} current={selectedIdx} onChange={handleChange} />
    </View>
  );
}

FormSteps.defaultProps = {
  steps: [],
};
export default FormSteps;

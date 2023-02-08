import { useVisible } from '@/service/use-service';
import { View } from '@tarojs/components';
import ActionField from './action-field';
import './styles.less';

import Tree, { TreeProps } from './tree/tree';
import FloatLayout from '@/components/float-layout';

type EleTreeProps = {
  value?: string;
  title?: string;
  root?: TreeProps;
  onChange?: any;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
};

function findValueFromTheTree(value, treeItem?: TreeProps) {
  const { value: currentValue, title: currentTitle, nodes = [] } = treeItem || {};
  if (currentValue === value) {
    return {
      currentValue: currentValue,
      displayValue: currentTitle,
    };
  }
  for (let i = 0; i < nodes.length; i += 1) {
    const result = findValueFromTheTree(value, nodes[i]);
    if (result) {
      return result;
    }
  }
}

function EleTree(props: EleTreeProps) {
  const { visible, show, close } = useVisible(false);

  const { value, title, root, onChange, disabled, placeholder, label } = props;

  const getValue = () => {
    const result = findValueFromTheTree(value, root);
    if (result) {
      return result;
    }
    return {
      currentValue: value,
      displayValue: value ? title : '',
    };
  };

  const { currentValue, displayValue } = getValue();

  return (
    <ActionField
      onClick={show}
      disabled={disabled}
      value={displayValue}
      placeholder={placeholder}
      toggleStatus={visible}
    >
      <FloatLayout title={label} onCancel={close} visible={visible}>
        <View style='height:80vh'>
          <Tree {...root} onChange={onChange} selected={currentValue} />
        </View>
      </FloatLayout>
    </ActionField>
  );
}

EleTree.defaultProps = {
  root: {},
};

export default EleTree;

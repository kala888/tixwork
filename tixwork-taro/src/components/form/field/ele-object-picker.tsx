import NavigationService from '@/nice-router/navigation-service';
import { noop } from '@/utils';
import _ from 'lodash';
import { ActionLike, CandidateValue } from '@/nice-router/nice-router-types';
import ObjectUtils from '@/utils/object-utils';
import ActionField from './action-field';
import './styles.less';

const OBJECT_PICKER_PAGE = '/genericform/object-picker-page';

type EleObjectPickerProps = {
  onChange?: (values: CandidateValue[]) => void;
  value: string | CandidateValue | CandidateValue[];
  placeholder?: string;
  disabled?: boolean;
  searchAction?: ActionLike;
  maxSelectCount?: number;
} & ActionLike;

function getDisplayName(value) {
  if (ObjectUtils.isEmpty(value)) {
    return '';
  }
  if (_.isString(value)) {
    return value;
  }
  if (_.isArray(value)) {
    // @ts-ignore
    return value.map((it) => it.title).join(',');
  }
  // @ts-ignore
  return value.title;
}

function EleObjectPicker(props: EleObjectPickerProps) {
  const { onChange = noop, value, placeholder, disabled } = props;
  const { searchAction, linkToUrl, maxSelectCount } = props;

  const goObjectPickerPage = async () => {
    const items: any = await NavigationService.goPage(
      OBJECT_PICKER_PAGE,
      { searchAction, linkToUrl, maxSelectCount },
      {
        delayCallBack: true,
      }
    );
    const values = ObjectUtils.isEmpty(items) ? [] : items.map((it) => ({ id: it.id, title: it.title }));
    onChange(values);
  };
  let displayName = getDisplayName(value);

  return (
    <ActionField
      onClick={goObjectPickerPage}
      toggleStatus={false}
      disabled={disabled}
      value={displayName}
      placeholder={placeholder}
    />
  );
}

EleObjectPicker.defaultProps = {
  onChange: noop,
};

export default EleObjectPicker;

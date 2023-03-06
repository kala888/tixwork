import { EleButtonProps } from '@/components/elements/ele-button'
import { LoadingType } from '@/nice-router/nice-router-util'

export interface ImageLike {
  imageUrl?: string;
}

export interface ImageListLike {
  imageList?: ImageLike[];
}

export interface IconLike {
  icon?: string;
}

export interface VideoLike {
  videoUrl?: string;
}

export interface ActionLike {
  code?: string;
  linkToUrl?: string;
  onPress?: Function;
  onChange?: Function;
  extraData?: any;
  disabled?: boolean;
  statInPage?: boolean;
  loading?: LoadingType
}

export interface ModeClass {
  mode?: string | string[];
  style?: any;
}

export interface EleObject {
  id?: string | number | boolean;
  title?: string;
  brief?: string;
}

// title就是name  ,id就是值，就是value
export interface CandidateValue extends EleObject {
  selected?: boolean;
}

export interface TitleValue {
  title?: any;
  value?: any;
}

export interface ActionListLike {
  actionList: EleButtonProps[];
}

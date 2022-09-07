import GenericPageBase from './generic-page-base';
import useModel from '@/model/use-model';

export default () => {
  const { root } = useModel('genericpage');
  return <GenericPageBase {...root} />;
};

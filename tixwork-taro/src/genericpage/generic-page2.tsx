import GenericPageBase from './generic-page-base';
import useModel from '@/model/use-model';

export default () => {
  const { root = {} as any } = useModel('genericpage2');
  return <GenericPageBase {...root} />;
};

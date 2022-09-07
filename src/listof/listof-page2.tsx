import ListofPageBase from './listof-page-base';
import useModel from '@/model/use-model';

export default () => {
  const { root = {} as any } = useModel('listofpage2');
  return <ListofPageBase {...root} />;
};

import ListofPageBase from './listof-page-base';
import useModel from '@/model/use-model';

export default () => {
  const { root } = useModel('listofpage');
  return <ListofPageBase {...root} />;
};

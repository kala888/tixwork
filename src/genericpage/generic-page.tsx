import { useSelector } from 'react-redux';
import GenericPageBase from './generic-page-base';

export default () => {
  // @ts-ignore
  const root = useSelector((state) => state.genericpage);
  return <GenericPageBase {...root} />;
};

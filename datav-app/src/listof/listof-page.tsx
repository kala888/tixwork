import React from 'react'
import { useSelector } from 'react-redux'
import ListofPageBase from './listof-page-base'

export default () => {
  // @ts-ignore
  const root = useSelector((state) => state.listofpage)
  return <ListofPageBase {...root} />
};

import StorageTools from '@/nice-router/storage-tools';
import {useEffect, useState} from 'react';

const DASHBOARD_URL_KEY = 'dashboard-url';

export default function useRemoteUrl() {
  const [url, setUrl] = useState('');
  useEffect(() => {
    StorageTools.get(DASHBOARD_URL_KEY, '').then(setUrl)
  }, []);

  const saveUrl = async (value) => {
    setUrl(value)
    await StorageTools.set(DASHBOARD_URL_KEY, value);
  }
  const clear = async () => {
    setUrl('')
    await StorageTools.set(DASHBOARD_URL_KEY, '');
  }

  return ({
    url,
    saveUrl,
    clear
  })
};

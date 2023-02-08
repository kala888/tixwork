import { useEffect, useState } from 'react';
import ElePicker, { ElePickerProps } from '@/components/form/field/ele-picker';
import { isNotEmpty } from '@/utils/object-utils';
import StorageTools from '@/utils/storage-tools';
import Q from '@/http/q';

function RegionPicker(props: ElePickerProps) {
  const [source, setSource] = useState<Record<string, any[]>[]>([]);

  useEffect(() => {
    const regionData = StorageTools.get('region-data', null);
    let initialed = false;
    if (isNotEmpty(regionData)) {
      setSource(regionData);
      initialed = true;
    }
    Q.get('city-region/list').then((resp) => {
      const { data } = resp;
      if (!Array.isArray(data)) {
        return;
      }
      if (!initialed) {
        setSource(data);
      }
      StorageTools.set('region-data', data, 3600);
    });
  }, []);

  return <ElePicker {...props} candidateValues={source} />;
}

export default RegionPicker;

import { Button, View } from '@tarojs/components';
import { useState } from 'react';
import Q from '@/http/q';

function TestPage() {
  const [data, setData] = useState();
  const test = () => Q.get('/test/time').then((res) => setData(res.data));
  const testErr = () => Q.get('/test/time-error').then((res) => setData(res.data));
  return (
    <View>
      <View>data is:{JSON.stringify(data)}</View>
      <Button onClick={test}>test</Button>
      <Button onClick={testErr}>error-test</Button>
    </View>
  );
}

export default TestPage;

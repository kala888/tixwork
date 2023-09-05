import { DoubleLeftOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { Button, Space } from 'antd';
import Texty from 'rc-texty';
import React from 'react';
import img from '../assets/404.svg';

const NoFoundPage: React.FC = () => (
  <div className="flex-center" style={{ height: '100vh', padding: '10%' }}>
    <Space direction="vertical" style={{ alignItems: 'flex-end', alignSelf: 'flex-start' }}>
      <div style={{ fontSize: 18, color: '#666', paddingTop: 20 }}>
        <Texty type="left" mode="smooth">
          抱歉，看到这个页面，意味着你走丢了。
        </Texty>
      </div>
      <Button type="primary" style={{ width: 100, alignSelf: 'flex-end' }} onClick={() => history.push('/')}>
        <DoubleLeftOutlined /> 回首页
      </Button>
    </Space>
    <img alt="404" src={img} style={{ height: '70vh' }} />
  </div>
);
export default NoFoundPage;

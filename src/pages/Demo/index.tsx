import { ProCard } from '@ant-design/pro-components';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import Menu from './components/Menu';

const Demo: React.FC = () => {
  const [hasChange, setHasChange] = useState(false);

  return (
    <ProCard
      direction="row"
      bodyStyle={{
        padding: '0',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Menu />
      <ProCard
        title="单独的 Actions 操作项"
        colSpan={12}
        bordered
        actions={[<EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]}
        onClick={() => setHasChange(false)}
      >
        <div>Card content</div>
        <div>Card content</div>
        <div>Card content</div>
      </ProCard>
      <ProCard colSpan={5} bordered>
        colSpan-6
      </ProCard>
    </ProCard>
  );
};

export default Demo;

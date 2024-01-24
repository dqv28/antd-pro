import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React from 'react';

const FormSearch: React.FC<{
  value?: any;
  onChange?: (value: any) => void;
}> = ({ value, onChange }) => {
  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: 'rgb(248, 249, 250)',
        padding: '12px 24px',
        height: 40,
      }}
    >
      <Input placeholder="Search..." bordered={false} style={{ padding: 0 }} />
      <SearchOutlined style={{ color: '#757575', fontSize: 16 }} />
    </div>
  );
};

export default FormSearch;

import { MsgIcon } from '@/components/Icons';
import { Button, Input, Space } from 'antd';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <Space>
      <Input />
      <Button size="large" type="text" icon={<MsgIcon />} title="Thêm bạn vào nhóm" />
    </Space>
  );
};

export default Footer;

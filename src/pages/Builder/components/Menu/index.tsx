import { CaretRightOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { Row } from 'antd';
import { type Key, useState } from 'react';
import MenuItem from './MenuItem';

import './Menu.css';
import type { CompList } from '@/services/ant-design-pro/api';

type Props = {
  compLists: CompList[];
  [key: string]: any;
};

const MenuComp = ({ compLists }: Props) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly Key[]>([0]);

  const data = [
    {
      title: 'Basics',
      description: (
        <Row gutter={[8, 8]} style={{ marginTop: 16 }}>
          {compLists.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </Row>
      ),
    },
    {
      title: 'Layout',
      description: (
        <Row gutter={[8, 8]} style={{ marginTop: 16 }}>
          {compLists.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </Row>
      ),
    },
    {
      title: 'Forms',
      description: (
        <Row gutter={[8, 8]} style={{ marginTop: 16 }}>
          {compLists.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </Row>
      ),
    },
  ];

  return (
    <ProList
      rowKey="id"
      dataSource={data}
      metas={{
        title: {
          dataIndex: 'title',
        },
        description: {
          dataIndex: 'description',
        },
      }}
      expandable={{
        expandIcon: () => <CaretRightOutlined style={{ color: '#e2e5e6' }} />,
        expandedRowKeys,
        onExpandedRowsChange: setExpandedRowKeys,
      }}
      cardProps={{
        bodyStyle: {
          padding: 0,
        },
      }}
      onItem={() => ({
        style: {
          padding: '12px 0',
        },
        className: 'list-item',
      })}
    />
  );
};

export default MenuComp;

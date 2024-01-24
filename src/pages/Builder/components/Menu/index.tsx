import { BoxIcon, BtnIcon, ColIcon, SectionIcon } from '@/components/Icons';
import { CaretRightOutlined, FontSizeOutlined, PictureOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { Row } from 'antd';
import { Key, useState } from 'react';
import MenuItem from './MenuItem';

import './Menu.css';

const compLists = [
  {
    id: 1,
    icon: <FontSizeOutlined />,
    text: 'Text',
    type: 'Text',
  },
  {
    id: 2,
    icon: <PictureOutlined />,
    text: 'Image',
    type: 'Image',
  },
  {
    id: 3,
    icon: <BtnIcon />,
    text: 'Button',
    type: 'Button',
  },
  {
    id: 4,
    icon: <ColIcon />,
    text: 'Columns',
    type: 'Columns',
  },
  {
    id: 5,
    icon: <BoxIcon />,
    text: 'Box',
    type: 'Box',
  },
  {
    id: 6,
    icon: <SectionIcon />,
    text: 'Section',
    type: 'Section',
  },
];

const MenuComp = () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly Key[]>([]);

  const data = [
    {
      title: 'Basics',
      description: (
        <Row gutter={[8, 8]} style={{ marginTop: 16 }}>
          {compLists.map((item) => (
            <MenuItem item={item} />
          ))}
        </Row>
      ),
    },
    {
      title: 'Layout',
      description: (
        <Row gutter={[8, 8]} style={{ marginTop: 16 }}>
          {compLists.map((item) => (
            <MenuItem item={item} />
          ))}
        </Row>
      ),
    },
    {
      title: 'Forms',
      description: (
        <Row gutter={[8, 8]} style={{ marginTop: 16 }}>
          {compLists.map((item) => (
            <MenuItem item={item} />
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

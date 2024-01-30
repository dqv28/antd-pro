import { CaretRightOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { Key, useState } from 'react';
import RowOptions from './BuilderOptions/RowOptions';
import BoxOpttions from './BuilderOptions/BoxOptions';
import ButtonOptions from './BuilderOptions/ButtonOptions';
import ImageOptions from './BuilderOptions/ImageOptions';

type Props = {
  activeNum: number;
  changeActiveNum: (num: number) => void;
};

const BuilderOptions = ({ activeNum, changeActiveNum }: Props) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly Key[]>([0]);
  const [type, setType] = useState('Image');

  const options = {
    Row: <RowOptions activeNum={activeNum} changeActiveNum={changeActiveNum} />,
    Box: <BoxOpttions />,
    Button: <ButtonOptions />,
    Image: <ImageOptions />,
  };

  const data = [
    {
      title: 'Block Options',
      description: <>{options[type]}</>,
    },
    {
      title: 'Advanced Options',
      description: 'Advanced Options',
    },
    {
      title: 'Page fields',
      description: 'Page fields',
    },
  ];

  return (
    <ProList
      rowKey="id"
      dataSource={data}
      metas={{
        title: {
          dataIndex: 'title',
          render: (dom) => <h3>{dom}</h3>,
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

export default BuilderOptions;

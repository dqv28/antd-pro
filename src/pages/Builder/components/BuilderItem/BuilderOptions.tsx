import { CaretRightOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { Key, useState } from 'react';
import RowOptions from './BuilderOptions/RowOptions';
import BoxOpttions from './BuilderOptions/BoxOptions';
import ButtonOptions from './BuilderOptions/ButtonOptions';
import ImageOptions from './BuilderOptions/ImageOptions';
import SectionOptions from './BuilderOptions/SectionOptions';
import TextOptions from './BuilderOptions/TextOptions';
import { ChooseIcon } from '@/components/Icons';

type Props = {
  activeNum: number;
  changeActiveNum: (num: number) => void;
  type: string;
  [key: string]: any;
};

const NoOption = () => (
  <>
    <div style={{ padding: '20px 40px' }}>Select an element to edit its options</div>
    <ChooseIcon style={{ display: 'block', padding: '20px 40px' }} />
  </>
)

const BuilderOptions = ({ activeNum, changeActiveNum, type }: Props) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly Key[]>([0]);
  // const [type, setType] = useState('Image');

  const options = {
    Row: <RowOptions activeNum={activeNum} changeActiveNum={changeActiveNum} />,
    Box: <BoxOpttions />,
    Section: <SectionOptions />,
    Button: <ButtonOptions />,
    Image: <ImageOptions />,
    Text: <TextOptions />,
  };

  const data = [
    {
      title: 'Block Options',
      description: <>{options[type] ?? <NoOption />}</>, 
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

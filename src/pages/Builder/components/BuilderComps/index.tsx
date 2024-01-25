import { Button, Divider } from 'antd';
import { FontSizeOutlined, PictureOutlined } from '@ant-design/icons';

import { BoxIcon, BtnIcon, ColIcon, SectionIcon } from '@/components/Icons';
import FormSearch from '../../FormSearch';
import { FigmaIcon } from '@/components/Icons';
import MenuComp from '../Menu';
import { CompList } from '@/services/ant-design-pro/api';
import { SortableContext } from '@dnd-kit/sortable';

type Props = {
  [key: string]: any;
};

const compLists: CompList[] = [
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
    text: 'Row',
    type: 'Row',
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

export const BuilderComps = (props: Props) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <FormSearch />
        <Button icon={<FigmaIcon />} style={{ height: 38, marginLeft: 16 }}>
          Import
        </Button>
      </div>
      <Divider style={{ margin: '12px 0' }} />

      <SortableContext items={[]}>
        <MenuComp compLists={compLists} />
      </SortableContext>
    </>
  );
};

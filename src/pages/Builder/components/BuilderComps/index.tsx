import FormSearch from '../../FormSearch';
import { Button, Divider } from 'antd';
import { FigmaIcon } from '@/components/Icons';
import MenuComp from '../Menu';

type Props = {};

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

      <MenuComp />
    </>
  );
};

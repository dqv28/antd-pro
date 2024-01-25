import { Block } from '@/services/ant-design-pro/api';
import Text from '../Text';
import Image from '../ImageComp';
import ButtonComp from '../Button';
import RowComp from '../Row';
import Section from '../Section';

import './Box.css';

type Props = {
  item: Block;
  [key: string]: any;
};

const Box = ({ item, ...props }: Props) => {
  return (
    <div
      className="box"
      style={{
        marginTop: 16,
        padding: '0 0 16px',
        height: item.children && item.children.length > 0 ? 'auto' : 200,
      }}
    >
      {item.children &&
        item.children.map((child: any) => (
          <>
            {child.type === 'Text' && <Text item={child} />}
            {child.type === 'Image' && <Image item={child} />}
            {child.type === 'Button' && <ButtonComp item={child} />}
            {child.type === 'Row' && <RowComp item={child} />}
            {child.type === 'Box' && <Box item={child} />}
            {child.type === 'Section' && <Section item={child} />}
          </>
        ))}
    </div>
  );
};

export default Box;

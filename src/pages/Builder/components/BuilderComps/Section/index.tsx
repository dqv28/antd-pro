import { Block } from '@/services/ant-design-pro/api';
import Text from '../Text';
import Image from '../ImageComp';
import ButtonComp from '../Button';
import RowComp from '../Row';
import Box from '../Box';

import './Section.css';

type Props = {
  item: Block;
  [key: string]: any;
};

const Section = ({ item, ...props }: Props) => {
  return (
    <div
      className="section"
      style={{
        marginTop: 16,
        padding: '0 20px 16px',
        height: item.children && item.children.length > 0 ? 'auto' : 100,
        // border: collision ? '1px solid #66a8ff' : '',
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

export default Section;

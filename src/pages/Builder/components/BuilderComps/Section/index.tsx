import { Block } from '@/services/ant-design-pro/api';
import Text from '../Text';
import Image from '../ImageComp';
import ButtonComp from '../Button';
import RowComp from '../Row';
import Box from '../Box';

import './Section.css';
import NoBuilder from '../NoBuilder';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type Props = {
  item: Block;
  [key: string]: any;
};

const Section = ({ item, ...props }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: item.id,
    data: item,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {item.children.map((col) => (
        <div
          className="section"
          style={{
            marginTop: 16,
            padding: '0 20px 16px',
            minHeight: 100,
          }}
        >
          {col.children && col.children.length > 0 ? (
            col.children.map((child: any) => (
              <>
                {child.type === 'Text' && <Text item={child} />}
                {child.type === 'Image' && <Image item={child} />}
                {child.type === 'Button' && <ButtonComp item={child} />}
                {child.type === 'Row' && <RowComp item={child} />}
                {child.type === 'Box' && <Box item={child} />}
                {child.type === 'Section' && <Section item={child} />}
              </>
            ))
          ) : (
            <NoBuilder id={col.id} col={col} isRow={item.type === 'Row'} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Section;

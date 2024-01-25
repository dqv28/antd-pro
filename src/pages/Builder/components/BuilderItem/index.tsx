import { Block } from '@/services/ant-design-pro/api';
import Text from '../BuilderComps/Text';
import Image from '../BuilderComps/ImageComp';
import ButtonComp from '../BuilderComps/Button';
import RowComp from '../BuilderComps/Row';
import Box from '../BuilderComps/Box';
import Section from '../BuilderComps/Section';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type Props = {
  item: Block;
  [key: string]: any;
};

const BuilderItem = ({ item, collision, ...props }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
    data: item,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 9999 : 0,
    transition,
  };

  return (
    <div key={props.index} ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {item.type === 'Text' && <Text item={item} />}
      {item.type === 'Image' && <Image item={item} />}
      {item.type === 'Button' && <ButtonComp item={item} />}
      {item.type === 'Row' && <RowComp item={item} />}
      {item.type === 'Box' && <Box item={item} />}
      {item.type === 'Section' && <Section item={item} collision={collision} />}
    </div>
  );
};

export default BuilderItem;

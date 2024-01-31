import { Block } from '@/services/ant-design-pro/api';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from 'antd';

type Props = {
  item: Block;
  isBelow?: boolean | null;
  [key: string]: any;
};
const ButtonComp = ({ item, isBelow, ...props }: Props) => {
  const {
    options: { text },
  } = item;

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: item.id,
    data: item,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    borderTop: isBelow === false ? '4px solid #66a8ff' : '4px solid transparent',
    borderBottom: isBelow === true ? '4px solid #66a8ff' : '4px solid transparent',
    transition,
  };

  return (
    <Button
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      size="large"
      type="text"
      style={{ backgroundColor: '#333', color: '#fff', marginTop: 16, ...style }}
      block
    >
      {text}
    </Button>
  );
};

export default ButtonComp;

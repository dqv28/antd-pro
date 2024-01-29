import { Block } from '@/services/ant-design-pro/api';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from 'antd';

type Props = {
  item: Block;
  [key: string]: any;
};
const ButtonComp = ({ item, ...props }: Props) => {
  const {
    options: { text },
  } = item;

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: item.id,
    data: item,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
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

import { Block } from '@/services/ant-design-pro/api';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { childObj } from '../BuilderComps/Object';
import { UniqueIdentifier } from '@dnd-kit/core';

type Props = {
  item: Block;
  isBelow?: boolean | null;
  overId?: UniqueIdentifier;
  [key: string]: any;
};

const BuilderItem = ({ item, isBelow, overId, ...props }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
    data: item,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 9999 : 0,
    transition,
  };

  const ChildComponent = childObj[item.type];

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ChildComponent isBelow={isBelow} item={item} overId={overId} />
    </div>
  );
};

export default BuilderItem;

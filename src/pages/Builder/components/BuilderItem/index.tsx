import type { Block } from '@/services/ant-design-pro/api';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { childObj } from '../BuilderComps/Object';
import { UniqueIdentifier } from '@dnd-kit/core';

type Props = {
  item: Block;
  isBelow?: boolean | null;
  overItem?: Block;
  onChildClick?: (type: string, childId: UniqueIdentifier) => void;
  [key: string]: any;
};

const BuilderItem = ({ item, isBelow, overItem, onChildClick }: Props) => {
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

  const handleClick = (e: any) => {
    e.stopPropagation();
    onChildClick?.(item.type, item.id);
  };

  return (
    <div onClick={handleClick} ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ChildComponent isBelow={isBelow} item={item} overItem={overItem} />
    </div>
  );
};

export default BuilderItem;

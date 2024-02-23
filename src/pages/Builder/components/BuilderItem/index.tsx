import type { Block } from '@/services/ant-design-pro/api';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { childObj } from '../BuilderComps/Object';
import type { UniqueIdentifier } from '@dnd-kit/core';
import { Badge } from 'antd';

type BuidlerItemProps = {
  item: Block;
  isBelow?: boolean | null;
  overItem?: Block;
  onChildClick?: (type: string, childId: UniqueIdentifier) => void;
  key: React.Key;
  active: any;
  [key: string]: any;
};

const BuilderItem: React.FC<BuidlerItemProps> = ({
  item,
  isBelow,
  overItem,
  onChildClick,
  active,
  key,
}) => {
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
    console.log(active);
    console.log(item);
    e.stopPropagation();
    onChildClick?.(item.type, item.id);
  };

  return (
    <div
      key={key}
      onClick={handleClick}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Badge dot={active !== null && active.id === item.id} style={{ marginTop: 16 }}>
        <ChildComponent isBelow={isBelow} item={item} overItem={overItem} />
      </Badge>
    </div>
  );
};

export default BuilderItem;

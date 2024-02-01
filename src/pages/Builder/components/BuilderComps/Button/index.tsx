import { Block } from '@/services/ant-design-pro/api';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from 'antd';
import { useState } from 'react';

type Props = {
  item: Block;
  isBelow?: boolean | null;
  [key: string]: any;
};
const ButtonComp = ({ item, isBelow }: Props) => {
  const {
    options: { text },
  } = item;

  const [isHover, setIsHover] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition, isOver } = useSortable({
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
      style={{
        backgroundColor: '#333',
        color: '#fff',
        marginTop: 16,
        position: 'relative',
        ...style,
      }}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      block
    >
      {text}
      {(isHover || isOver) && (
        <div
          style={{
            position: 'absolute',
            top: isBelow !== null ? (isBelow === true ? 'calc(100% - 4px)' : 0) : 0,
            left: 0,
            right: 0,
            height: 4,
            backgroundColor: isBelow !== null ? '#66a8ff' : 'transparent',
          }}
        />
      )}
    </Button>
  );
};

export default ButtonComp;

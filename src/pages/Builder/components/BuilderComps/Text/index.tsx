import { Block } from '@/services/ant-design-pro/api';
import { useState } from 'react';

import '../style.css';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type Props = {
  item: Block;
  isBelow?: boolean | null;
  [key: string]: any;
};

const Text = ({ item, isBelow, ...props }: Props) => {
  const [isHover, setIsHover] = useState(false);
  const [change, setChange] = useState(false);
  const {
    options: { text },
  } = item;

  const { attributes, listeners, setNodeRef, transform, transition, isOver } = useSortable({
    id: item.id,
    data: item,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    padding: change ? 0 : '8px 0',
    transition,
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {change ? (
        <input type="text" defaultValue={text} className="text-input" />
      ) : (
        <div
          onDoubleClick={() => setChange(true)}
          className="div-input"
          style={{
            position: 'relative',
            border: isHover || isOver ? '1px solid #66a8ff' : '1px solid transparent',
          }}
          onMouseOver={() => setIsHover(true)}
          onMouseOut={() => setIsHover(false)}
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
        </div>
      )}
    </div>
  );
};

export default Text;

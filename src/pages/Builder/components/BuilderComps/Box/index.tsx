import { Block } from '@/services/ant-design-pro/api';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import NoBuilder from '../NoBuilder';
import { renderColChild } from '../Object';

import '../style.css';
import { UniqueIdentifier } from '@dnd-kit/core';
import { useEffect, useState } from 'react';

type Props = {
  item: Block;
  isBelow?: boolean | null;
  overId?: UniqueIdentifier;
  [key: string]: any;
};

const Box = ({ item, isBelow, overId }: Props) => {
  const [isHover, setIsHover] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition, isOver } = useSortable({
    id: item.id,
    data: item,
  });

  const childIds = item.children.map((col) => col.id);

  useEffect(() => {
    setIsHover(childIds.includes(overId ?? '') || item.id === overId);
  }, [overId]);

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {item.children.map((col) => (
        <div
          style={{
            position: 'relative',
            padding: '16px 0',
            marginTop: 16,
            minHeight: 100,
            border: isHover || isOver ? '1px solid #66a8ff' : '1px solid transparent',
          }}
          onMouseOver={() => setIsHover(true)}
          onMouseOut={() => setIsHover(false)}
        >
          <div
            style={{
              backgroundColor:
                isBelow === null && overId && col.id === overId ? 'rgba(7, 178, 215, 0.2)' : '',
            }}
          >
            {col.children && col.children.length > 0 ? (
              col.children.map((child: Block) => renderColChild(child, isBelow, overId))
            ) : (
              <NoBuilder id={col.id} col={col} isRow={item.type === 'Row'} />
            )}
          </div>
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
      ))}
    </div>
  );
};

export default Box;

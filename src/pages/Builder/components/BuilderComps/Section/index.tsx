import type { Block } from '@/services/ant-design-pro/api';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import NoBuilder from '../NoBuilder';
import { includesChild, renderColChild } from '../Object';

import '../style.css';
import { useCallback, useEffect, useState } from 'react';

type Props = {
  item: Block;
  isBelow?: boolean | null;
  overItem?: Block;
  [key: string]: any;
};

const Section = ({ item, isBelow, overItem }: Props) => {
  const [isHover, setIsHover] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition, isOver } = useSortable({
    id: item.id,
    data: item,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const isColumn = isBelow === false && overItem && overItem.type === 'Column';

  useEffect(() => {
    setIsHover(includesChild(item, item.children, overItem));
  }, [item, overItem]);

  const mouseOver = useCallback(() => {
    setIsHover(true);
  }, []);

  const mouseOut = useCallback(() => {
    setIsHover(false);
  }, []);

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {item.children.map((col) => (
        <div
          key={col.id}
          className="section"
          style={{
            position: 'relative',
            padding:
              isBelow === null && overItem && col.id === overItem.id ? '16px 0' : '16px 20px',
            marginTop: 16,
            minHeight: 100,
            border: isHover || isOver ? '1px solid #66a8ff' : '1px solid transparent',
          }}
          onMouseOver={mouseOver}
          onMouseOut={mouseOut}
        >
          <div
            style={{
              backgroundColor:
                isColumn && overItem && col.id === overItem.id ? 'rgba(7, 178, 215, 0.2)' : '',
            }}
          >
            {col.children && col.children.length > 0 ? (
              col.children.map((child) => renderColChild(child, isBelow, overItem))
            ) : (
              <NoBuilder id={col.id} col={col} isRow={item.type === 'Row'} />
            )}
          </div>
          {(isHover || isOver) && (
            <div
              style={{
                position: 'absolute',
                top: isBelow === true ? 'calc(100% - 4px)' : 0,
                left: 0,
                right: 0,
                height: 4,
                backgroundColor: !isColumn ? '#66a8ff' : 'transparent',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Section;

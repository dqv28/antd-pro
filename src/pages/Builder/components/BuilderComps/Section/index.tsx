import { Block } from '@/services/ant-design-pro/api';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import NoBuilder from '../NoBuilder';
import { renderColChild } from '../Object';

import '../style.css';
import { UniqueIdentifier } from '@dnd-kit/core';

type Props = {
  item: Block;
  isBelow?: boolean | null;
  overId?: UniqueIdentifier;
  [key: string]: any;
};

const Section = ({ item, isBelow, overId, ...props }: Props) => {
  console.log('overId', overId);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: item.id,
    data: item,
  });
  const colIds = item.children.map((col) => col.id);

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {item.children.map((col) => (
        <div
          style={{
            marginTop: 16,
            minHeight: 100,
            borderTop: isBelow === false ? '4px solid #66a8ff' : '1px solid #66a8ff',
            borderBottom: isBelow === true ? '4px solid #66a8ff' : '1px solid #66a8ff',
            border: isBelow === null && colIds.includes(overId ?? '') ? '1px solid #66a8ff' : '',
          }}
        >
          <div
            className="section"
            style={{
              padding: '16px 20px',
            }}
          >
            <div
              style={{
                backgroundColor:
                  isBelow === null && overId && col.id === overId ? 'rgba(7, 178, 215, 0.2)' : '',
              }}
            >
              {col.children && col.children.length > 0 ? (
                col.children.map((child) => renderColChild(child))
              ) : (
                <NoBuilder id={col.id} col={col} isRow={item.type === 'Row'} />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Section;

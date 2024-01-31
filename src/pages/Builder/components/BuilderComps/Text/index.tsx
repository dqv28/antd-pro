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
  const [change, setChange] = useState(false);
  const {
    options: { text },
  } = item;

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
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
          style={{
            borderTop: isBelow === false ? '4px solid #66a8ff' : '4px solid transparent',
            borderBottom: isBelow === true ? '4px solid #66a8ff' : '4px solid transparent',
          }}
        >
          <div onDoubleClick={() => setChange(true)} className="div-input">
            {text}
          </div>
        </div>
      )}
    </div>
  );
};

export default Text;

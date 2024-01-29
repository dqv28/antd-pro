import { Block } from '@/services/ant-design-pro/api';
import { useState } from 'react';

import './Text.css';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type Props = {
  item: Block;
  [key: string]: any;
};

const Text = ({ item, ...props }: Props) => {
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
        <div onDoubleClick={() => setChange(true)} className="div-input">
          {text}
        </div>
      )}
    </div>
  );
};

export default Text;

import type { Block } from '@/services/ant-design-pro/api';

import '../style.css';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';

type Props = {
  item: Block;
  isBelow?: boolean | null;
  [key: string]: any;
};
const Image = ({ item, isBelow }: Props) => {
  const {
    options: { imageUrl, alt },
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
    <div
      className={!imageUrl || !alt ? 'img' : ''}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        backgroundImage: `url(${
          !imageUrl
            ? 'https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F72c80f114dc149019051b6852a9e3b7a'
            : imageUrl
        })`,
        marginTop: 16,
        position: 'relative',
        ...style,
      }}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
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
  );
};

export default Image;

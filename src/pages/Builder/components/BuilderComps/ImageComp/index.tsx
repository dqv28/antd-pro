import { Block } from '@/services/ant-design-pro/api';

import '../style.css';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type Props = {
  item: Block;
  [key: string]: any;
};
const Image = ({ item, ...props }: Props) => {
  const {
    options: { imageUrl, alt },
  } = item;

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
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
        ...style,
      }}
    />
  );
};

export default Image;

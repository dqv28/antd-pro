import { Block } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import { UniqueIdentifier, useDroppable } from '@dnd-kit/core';

type Props = {
  id: UniqueIdentifier;
  col?: Block;
  isRow: boolean;
};

const NoBuilder = ({ id, col, isRow }: Props) => {
  const { setNodeRef } = useDroppable({
    id,
    data: col,
  });
  return (
    <div
      style={{
        backgroundColor: isRow ? 'rgba(26, 115, 232, 0.1)' : 'transparent',
        border: isRow ? '1px dashed rgba(26, 115, 232, 1)' : '',
        height: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      ref={setNodeRef}
    >
      {isRow && (
        <button style={{ border: 0, background: 'none' }} type="button">
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Dnd to Add block</div>
        </button>
      )}
    </div>
  );
};

export default NoBuilder;

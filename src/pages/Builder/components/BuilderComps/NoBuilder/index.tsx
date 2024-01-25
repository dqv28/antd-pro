import { PlusOutlined } from '@ant-design/icons';
import { useDroppable } from '@dnd-kit/core';

type Props = {};

const NoBuilder = (props: Props) => {
  const { setNodeRef } = useDroppable({
    id: 'no-builder',
  });
  return (
    <div
      style={{
        backgroundColor: 'rgba(26, 115, 232, 0.1)',
        border: '1px dashed rgba(26, 115, 232, 1)',
        height: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      ref={setNodeRef}
    >
      <button style={{ border: 0, background: 'none' }} type="button">
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Dnd to Add block</div>
      </button>
    </div>
  );
};

export default NoBuilder;

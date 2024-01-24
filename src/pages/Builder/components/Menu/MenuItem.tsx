import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Button, Col } from 'antd';
import React from 'react';

type MenuItemProps = {
  id: number;
  icon: React.ReactNode;
  text: string;
};

interface Props {
  item: MenuItemProps;
}

const MenuItem = (props: Props) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: props.item.id,
    data: props.item,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 9999 : 0,
  };

  return (
    <Col span={8} key={props.item.id} ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Button
        type="text"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 80,
          backgroundColor: '#f6f7f8',
          padding: 0,
          borderRadius: 6,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        icon={props.item.icon}
        block
      >
        <span style={{ marginTop: 8 }}>{props.item.text}</span>
      </Button>
    </Col>
  );
};

export default MenuItem;

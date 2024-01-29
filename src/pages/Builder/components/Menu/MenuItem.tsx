import { useSortable } from '@dnd-kit/sortable';
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
  [key: string]: any;
}

const MenuItem = (props: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.item.id,
    data: props.item,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <Col span={8} key={props.item.id} ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Button
        type="text"
        style={{
          height: 80,
          backgroundColor: '#f6f7f8',
          padding: 0,
          borderRadius: 6,
        }}
        icon={props.item.icon}
        block
      >
        <div style={{ marginTop: 4 }}>{props.item.text}</div>
      </Button>
    </Col>
  );
};

export default MenuItem;

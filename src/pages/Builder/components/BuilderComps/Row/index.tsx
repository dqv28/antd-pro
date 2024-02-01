import { Block } from '@/services/ant-design-pro/api';
import { Col, Row } from 'antd';
import NoBuilder from '../NoBuilder';
import { useEffect, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import '../style.css';
import { renderColChild } from '../Object';
import { UniqueIdentifier } from '@dnd-kit/core';

type Props = {
  item: Block;
  isBelow?: boolean | null;
  overId?: UniqueIdentifier;
  [key: string]: any;
};

const RowComp = ({ item, isBelow, overId }: Props) => {
  const {
    options: { cols: colCount },
    children,
  } = item;

  const [isHover, setIsHover] = useState<boolean>();
  const [cols, setCols] = useState<Block[]>([]);

  const { attributes, listeners, setNodeRef, transform, transition, isOver } = useSortable({
    id: item.id,
    data: item,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    border: isHover || isOver ? '1px solid #66a8ff' : '1px solid transparent',
    margin: '16px 0 0',
    padding: '16px 0',
    transition,
  };

  const childIds = item.children.map((col) => col.id);

  useEffect(() => {
    setIsHover(childIds.includes(overId ?? '') || item.id === overId);
  }, [overId]);

  useEffect(() => {
    setCols([...children]);
  }, [item]);

  return (
    <Row
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      gutter={16}
      style={{ position: 'relative', ...style }}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      {cols.map((col: Block, index) => (
        <Col
          span={24 / colCount}
          key={index}
          style={{
            filter: isBelow === null && overId && col.id === overId ? 'brightness(70%)' : 'none',
          }}
        >
          {col.children && col.children.length > 0 ? (
            col.children.map((child: Block, index: number) => (
              <div key={index}>{renderColChild(child, isBelow, overId)}</div>
            ))
          ) : (
            <NoBuilder id={col.id} col={col} isRow={item.type === 'Row'} />
          )}
        </Col>
      ))}
      {(isHover || isOver) && (
        <div
          style={{
            position: 'absolute',
            top: isBelow !== null && isBelow === true ? 'calc(100% - 4px)' : 0,
            left: 0,
            right: 0,
            height: 4,
            backgroundColor: isBelow !== null ? '#66a8ff' : 'transparent',
          }}
        />
      )}
    </Row>
  );
};

export default RowComp;

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

const RowComp = ({ item, isBelow, overId, ...props }: Props) => {
  const {
    options: { cols: colCount },
    children,
  } = item;

  const [cols, setCols] = useState<Block[]>([]);

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: item.id,
    data: item,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    borderTop: isBelow === false ? '4px solid #66a8ff' : '4px solid transparent',
    borderBottom: isBelow === true ? '4px solid #66a8ff' : '4px solid transparent',
    transition,
  };

  useEffect(() => {
    setCols([...children]);
  }, [item]);

  // useEffect(() => {
  //   if (colCount === 1) {
  //     setCols((prevCols) => [prevCols.shift()]);
  //   } else {
  //     for (let i = 0; i < colCount; i++) {
  //       setCols((prevCols) => [
  //         ...prevCols,
  //         {
  //           id: uniqueId(),
  //           type: 'Column',
  //           options: {},
  //           children: [],
  //         },
  //       ]);
  //     }
  //   }
  //   return () => setCols([]);
  // }, [colCount]);
  return (
    <Row
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      gutter={16}
      className="row"
      style={{
        margin: ' 16px 0 0',
        ...style,
      }}
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
              <div key={index}>{renderColChild(child)}</div>
            ))
          ) : (
            <NoBuilder id={col.id} col={col} isRow={item.type === 'Row'} />
          )}
        </Col>
      ))}
    </Row>
  );
};

export default RowComp;

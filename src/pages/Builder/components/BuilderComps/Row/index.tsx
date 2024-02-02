import { Block } from '@/services/ant-design-pro/api';
import { Col, Row } from 'antd';
import NoBuilder from '../NoBuilder';
import { useCallback, useEffect, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import '../style.css';
import { includesChild, renderColChild } from '../Object';

type Props = {
  item: Block;
  isBelow?: boolean | null;
  overItem?: Block;
  [key: string]: any;
};

const RowComp = ({ item, isBelow, overItem }: Props) => {
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

  const isColumn = isBelow === false && overItem && overItem.type === 'Column';

  useEffect(() => {
    setIsHover(includesChild(item, item.children, overItem));
  }, [overItem]);

  const mouseOver = useCallback(() => {
    setIsHover(true);
  }, []);

  const mouseOut = useCallback(() => {
    setIsHover(false);
  }, []);

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
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
    >
      {cols.map((col: Block, index) => (
        <Col
          span={24 / colCount}
          key={index}
          style={{
            filter: isColumn && overItem && col.id === overItem.id ? 'brightness(70%)' : 'none',
          }}
        >
          {col.children && col.children.length > 0 ? (
            col.children.map((child: Block, index: number) => (
              <div key={index}>{renderColChild(child, isBelow, overItem)}</div>
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
            top: isBelow === true ? 'calc(100% - 4px)' : 0,
            left: 0,
            right: 0,
            height: 4,
            backgroundColor: !isColumn ? '#66a8ff' : 'transparent',
          }}
        />
      )}
    </Row>
  );
};

export default RowComp;

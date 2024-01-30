import { Block } from '@/services/ant-design-pro/api';
import { Col, Row } from 'antd';
import NoBuilder from '../NoBuilder';
import Image from '../ImageComp';
import Text from '../Text';
import { useEffect, useState } from 'react';
import ButtonComp from '../Button';
import Box from '../Box';
import Section from '../Section';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import '../style.css';

type Props = {
  item: Block;
  [key: string]: any;
};

const RowComp = ({ item, ...props }: Props) => {
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
        <Col span={24 / colCount} key={index}>
          {col.children && col.children.length > 0 ? (
            col.children.map((child: any, index: number) => (
              <div key={index}>
                {child.type === 'Text' && <Text item={child} />}
                {child.type === 'Image' && <Image item={child} />}
                {child.type === 'Button' && <ButtonComp item={child} />}
                {child.type === 'Row' && <RowComp item={child} />}
                {child.type === 'Box' && <Box item={child} />}
                {child.type === 'Section' && <Section item={child} />}
              </div>
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

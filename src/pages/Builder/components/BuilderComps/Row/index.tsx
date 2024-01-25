import { Block } from '@/services/ant-design-pro/api';
import { Col, Row } from 'antd';
import NoBuilder from '../NoBuilder';
import Image from '../ImageComp';
import Text from '../Text';
import { useEffect, useState } from 'react';
import { uniqueId } from 'lodash';
import ButtonComp from '../Button';
import Box from '../Box';
import Section from '../Section';

type Props = {
  item: Block;
  [key: string]: any;
};

const RowComp = ({ item, ...props }: Props) => {
  const {
    options: { cols: colCount },
    children,
  } = item;

  const [cols, setCols] = useState(() => [...children]);

  useEffect(() => {
    if (colCount === 1) {
      setCols((prevCols) => [prevCols.shift()]);
    } else {
      for (let i = 0; i < colCount - 2; i++) {
        setCols((prevCols) => [
          ...prevCols,
          {
            id: uniqueId(),
            type: 'Column',
            options: {},
            children: [],
          },
        ]);
      }
    }
    return () => setCols([]);
  }, [colCount]);

  return (
    <Row gutter={16} style={{ marginTop: 16 }}>
      {cols.map((item: any) => (
        <>
          {item.children && item.children.length > 0 ? (
            <Col span={24 / colCount}>
              {item.children.map((child: any) => (
                <>
                  {child.type === 'Text' && <Text item={child} />}
                  {child.type === 'Image' && <Image item={child} />}
                  {child.type === 'Button' && <ButtonComp item={child} />}
                  {child.type === 'Row' && <RowComp item={child} />}
                  {child.type === 'Box' && <Box item={child} />}
                  {child.type === 'Section' && <Section item={child} />}
                </>
              ))}
            </Col>
          ) : (
            <Col span={24 / colCount}>
              <NoBuilder />
            </Col>
          )}
        </>
      ))}
    </Row>
  );
};

export default RowComp;

import { BoxPlotOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Button } from 'antd';
import { BuilderComps } from './components/BuilderComps';
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useState } from 'react';
import { BuilderComp } from '@/services/ant-design-pro/api';
import Text from './components/BuilderComps/Text';
import Image from './components/BuilderComps/ImageComp';
import ButtonComp from './components/BuilderComps/Button';
import NoBuilder from './components/BuilderComps/NoBuilder';

type Props = {};

const Builder = (props: Props) => {
  const [builder, setBuilder] = useState<BuilderComp>(() => ({
    // blocks: [
    //   {
    //     id: '1',
    //     type: 'Text',
    //     options: {
    //       text: 'Enter text...',
    //     },
    //   },
    //   {
    //     id: '2',
    //     type: 'Button',
    //     options: {
    //       text: 'Click me!',
    //       style: {
    //         color: 'red',
    //       },
    //     },
    //   },
    //   {
    //     id: '3',
    //     type: 'Image',
    //     options: {
    //       imageUrl:
    //         'https://cdn.builder.io/api/v1/image/assets%2Fada33349cbd04d0ea5c214a2ca4334ad%2Facefe38e214b4dda89a6d4f2b4bde628',
    //       alt: '',
    //       style: {},
    //     },
    //   },
    //   {
    //     id: '4',
    //     type: 'Row',
    //     options: {},
    //     children: [
    //       {
    //         id: '5',
    //         type: 'Column',
    //         options: {},
    //         children: [
    //           {
    //             id: '3',
    //             type: 'Image',
    //             options: {
    //               imageUrl: '',
    //             },
    //           },
    //         ],
    //       },
    //       {
    //         id: '5',
    //         type: 'Column',
    //         options: {},
    //         children: [
    //           {
    //             id: '3',
    //             type: 'Image',
    //             options: {
    //               imageUrl: '',
    //             },
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // ],
  }));
  const [isDropped, setIsDropped] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<any>();

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 500,
    },
  });

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 1,
    },
  });

  const sensors = useSensors(touchSensor, mouseSensor);

  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  });
  const style = {
    border: isOver ? '1px solid green' : undefined,
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    const {
      data: { current: activeData },
    } = active;
    setActiveItem(activeData);
    setIsDropped(over !== null);
  };

  const { blocks } = builder;

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <ProCard
        direction="row"
        title={
          <Button type="text" style={{ backgroundColor: '#fdfdfd', color: '#333' }} size="middle">
            <BoxPlotOutlined style={{ color: '#7f7f7f', fontSize: 12 }} />
            <span style={{ fontSize: 13 }}>My Space</span>
            <span
              style={{
                backgroundColor: 'transparent',
                color: '#5d96ff',
                marginLeft: 8,
                padding: 0,
                fontWeight: 'bold',
                fontSize: 10,
              }}
            >
              MAIN
            </span>
          </Button>
        }
        extra={
          <Button type="primary" size="large" style={{ marginLeft: 16 }}>
            Publish Update
          </Button>
        }
        bodyStyle={{
          padding: 0,
        }}
        headerBordered
      >
        <ProCard colSpan={5} bordered>
          <BuilderComps />
        </ProCard>

        <ProCard
          colSpan={14}
          bodyStyle={{
            padding: 0,
          }}
        >
          {/* <div ref={setNodeRef} style={style}>
            
          </div> */}

          {builder && blocks ? (
            blocks?.map((item) => (
              <>
                {item.type === 'Text' && <Text item={item} />}
                {item.type === 'Image' && <Image item={item} />}
                {item.type === 'Button' && <ButtonComp item={item} />}
              </>
            ))
          ) : (
            <NoBuilder />
          )}
        </ProCard>
        <ProCard colSpan={5} bordered></ProCard>
      </ProCard>
    </DndContext>
  );
};

export default Builder;

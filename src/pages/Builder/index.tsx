import { BoxPlotOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Button } from 'antd';
import { BuilderComps } from './components/BuilderComps';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useState } from 'react';
import { BuilderComp } from '@/services/ant-design-pro/api';
import NoBuilder from './components/BuilderComps/NoBuilder';
import { uniqueId } from 'lodash';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import BuilderItem from './components/BuilderItem';

type Props = {};

const optionsComp = {
  Text: {
    type: 'Text',
    options: {
      text: 'Enter text...',
    },
  },
  Button: {
    type: 'Button',
    options: {
      text: 'Click me!',
      style: {
        color: 'red',
      },
    },
  },
  Image: {
    type: 'Image',
    options: {
      imageUrl: '',
      alt: '',
      style: {},
    },
  },
  Row: {
    type: 'Row',
    options: {
      cols: 2,
    },
    children: [
      {
        id: uniqueId(),
        type: 'Column',
        options: {},
        children: [],
      },
      {
        id: uniqueId(),
        type: 'Column',
        options: {},
        children: [],
      },
    ],
  },
  Box: {
    type: 'Box',
    options: {},
    children: [],
  },
  Section: {
    type: 'Section',
    options: {},
    children: [],
  },
};

const Builder = (props: Props) => {
  const [activeItem, setActiveItem] = useState<any>();
  const [builder, setBuilder] = useState<BuilderComp>({
    blocks: [],
  });

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

  const { blocks } = builder;
  const typeHasChild = ['Box', 'Section'];

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    const {
      data: { current: activeData },
    } = active;

    const activeIndex = blocks?.findIndex((item) => item.id === active.id);

    const newComp = activeData && {
      id: uniqueId(),
      icon: activeData.icon,
      ...optionsComp[activeData.type],
    };

    if (over) {
      const {
        data: { current: overData },
      } = over;

      const overIndex = blocks?.findIndex((item) => item.id === over.id);
      setBuilder((prevBuilder) => ({
        blocks:
          typeof over.id !== typeof active.id
            ? typeHasChild.includes(overData && overData.type)
              ? prevBuilder.blocks.map((item) =>
                  item.id === over.id
                    ? {
                        ...item,
                        children: [...(item.children ?? []), newComp],
                      }
                    : item,
                )
              : [...(prevBuilder.blocks ?? []), newComp]
            : arrayMove(blocks, activeIndex, overIndex),
      }));
    }
  };
  const handleDragStart = ({ active }: DragStartEvent) => {
    const {
      data: { current: activeData },
    } = active;
    setActiveItem(activeData);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      // onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={blocks ? blocks.map((item) => item.id) : []}>
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
            {builder && blocks && blocks.length > 0 ? (
              blocks?.map((item, index) => <BuilderItem item={item} index={index} />)
            ) : (
              <NoBuilder />
            )}
          </ProCard>
          <ProCard colSpan={5} bordered></ProCard>
        </ProCard>
      </SortableContext>
      <DragOverlay>
        {activeItem && activeItem.id ? (
          <Button icon={activeItem.icon} style={{ opacity: 0.8, zIndex: 99999 }} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Builder;

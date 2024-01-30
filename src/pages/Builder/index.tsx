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
  UniqueIdentifier,
  useDraggable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { Block, BuilderComp } from '@/services/ant-design-pro/api';
import NoBuilder from './components/BuilderComps/NoBuilder';
import { uniqueId } from 'lodash';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import BuilderItem from './components/BuilderItem';
import BuilderOptions from './components/BuilderItem/BuilderOptions';

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
      imageUrl:
        'https://cdn.builder.io/api/v1/image/assets%2Fada33349cbd04d0ea5c214a2ca4334ad%2F0669cec62f0a4f239761bcde611992d3',
      alt: '',
      style: {},
    },
  },
  Row: {
    type: 'Row',
    options: {
      cols: 2,
    },
    children: [],
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

const filterBuilder = (blocks: Block[], activeId: UniqueIdentifier) => {
  let newBlocks: Block[] = [];
  for (const block of blocks) {
    if (block.id === activeId) {
      newBlocks.push();
    } else {
      newBlocks.push({
        ...block,
        children: filterBuilder(block.children, activeId),
      });
    }
  }

  return newBlocks;
};

const addBuilder = (
  blocks: Block[],
  newComp: Block,
  activeItem: any,
  activeData: any,
  overItem: any,
): Block[] => {
  let newBlocks: Block[] = [...blocks];
  let newIndex: number;
  const overIndex = blocks?.findIndex((item) => item.id === overItem.id);
  const idArr = blocks.map((item) => item.id);

  const isBelowOverItem =
    activeItem.rect.current.translated &&
    activeItem.rect.current.translated.top > overItem.rect.top + overItem.rect.height - 16;

  const modifier = isBelowOverItem ? 1 : 0;
  newIndex = overIndex >= 0 ? overIndex + modifier : idArr.length + 1;

  if (!overItem) {
    return newBlocks;
  }

  const {
    data: { current: overData },
  } = overItem;

  if (typeof activeItem.id === 'string' && activeItem.id !== overItem.id) {
    newBlocks = filterBuilder(blocks, activeItem.id);
  }

  if (overItem.id === 'no-builder' || (overData.type !== 'Column' && overIndex >= 0)) {
    return newBlocks.toSpliced(newIndex, 0, newComp);
  }

  return newBlocks?.map((block) =>
    block.id === overItem.id
      ? {
          ...block,
          children: [...(block.children ?? []), newComp],
        }
      : {
          ...block,
          children: addBuilder(block.children, newComp, activeItem, activeData, overItem),
        },
  );
};

const Builder = (props: Props) => {
  const [activeItem, setActiveItem] = useState<any>();
  const [activeNum, setActiveNum] = useState<number>(2);
  const [rowChild, setRowChild] = useState<Block[]>([]);
  const [builder, setBuilder] = useState<BuilderComp>({
    blocks: [],
  });

  const { transform } = useDraggable({
    id: 'draggable',
  });

  const changeActiveNum = (num: number) => setActiveNum(num);
  const { blocks } = builder;

  useEffect(() => {
    setRowChild(() => {
      const cols = optionsComp['Row'].options.cols;
      let child = [];
      for (let i = 0; i < cols; i++) {
        child.push({
          id: uniqueId(),
          type: 'Column',
          options: {},
          children: [],
        });
      }

      return child;
    });
  }, [builder]);

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

  const handleDragEnd = ({ active, over, ...event }: DragEndEvent) => {
    const {
      data: { current: activeData },
    } = active;
    const activeChild =
      activeData && activeData.children && activeData.children.map((item: Block) => item.id);

    const newComp = activeData && {
      id: uniqueId(),
      icon: activeData.icon,
      ...optionsComp[activeData.type],
      children:
        typeof activeData.id === 'string'
          ? [...activeData.children]
          : activeData.type === 'Row'
          ? [...rowChild]
          : [
              {
                id: uniqueId(),
                type: 'Column',
                options: {},
                children: [],
              },
            ],
    };

    if (over) {
      if (
        (typeof active.id === typeof over.id && active.id === over.id) ||
        (activeChild && activeChild.includes(over.id))
      ) {
        return;
      }

      setBuilder((prevBuilder) => ({
        blocks: addBuilder(prevBuilder.blocks, newComp, active, activeData, over),
      }));
    }
  };
  const handleDragStart = (e: DragStartEvent) => {
    console.log(e);
    const {
      data: { current: activeData },
    } = e.active;

    setActiveItem(activeData);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    // console.log(over);
  };

  const [elementPosition, setElementPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: any) => {
    console.log(e.clientX, e.clientY);
    setElementPosition({ x: e.clientX - 400, y: e.clientY - 170 });
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={[]} strategy={horizontalListSortingStrategy}>
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
            height: '82vh',
            maxHeight: '100%',
          }}
          headerBordered
        >
          <ProCard
            colSpan={5}
            style={{
              height: '100%',
            }}
            bordered
          >
            <BuilderComps />
          </ProCard>

          <ProCard
            colSpan={14}
            onMouseMove={handleMouseMove}
            style={{
              position: 'relative',
              maxHeight: '100%',
              overflow: 'auto',
            }}
            bodyStyle={{
              padding: 0,
            }}
          >
            {builder && blocks && blocks.length > 0 ? (
              blocks?.map((item) => <BuilderItem item={item} />)
            ) : (
              <NoBuilder id={'no-builder'} isRow={true} />
            )}
          </ProCard>
          <ProCard
            colSpan={5}
            style={{
              height: '100%',
            }}
            bodyStyle={{
              padding: '0 16px',
            }}
            bordered
          >
            <BuilderOptions activeNum={activeNum} changeActiveNum={changeActiveNum} />
          </ProCard>
        </ProCard>
      </SortableContext>
      <DragOverlay>
        {activeItem && activeItem.id ? (
          <Button
            icon={activeItem.icon}
            style={{
              zIndex: 9999,
              position: 'absolute',
              top: elementPosition.y,
              left: elementPosition.x,
            }}
          />
        ) : // <div
        //   style={{
        //     position: 'absolute',
        //     top: elementPosition.y,
        //     left: elementPosition.x,
        //     width: '50px',
        //     height: '50px',
        //     backgroundColor: 'red',
        //   }}
        // ></div>
        null}
      </DragOverlay>
    </DndContext>
  );
};

export default Builder;

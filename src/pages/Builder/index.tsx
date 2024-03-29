import { BoxPlotOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Button } from 'antd';
import { BuilderComps } from './components/BuilderComps';
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent, DragMoveEvent, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core';
import { useCallback, useEffect, useState } from 'react';
import type { Block, BuilderComp } from '@/services/ant-design-pro/api';
import NoBuilder from './components/BuilderComps/NoBuilder';
import { uniqueId } from 'lodash';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import BuilderItem from './components/BuilderItem';
import BuilderOptions from './components/BuilderItem/BuilderOptions';

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
  const newBlocks: Block[] = [];
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
  const overIndex = blocks?.findIndex((item) => item.id === overItem.id);
  const idArr = blocks.map((item) => item.id);

  const isBelowOverItem =
    activeItem.rect.current.translated &&
    activeItem.rect.current.translated.top > overItem.rect.top + overItem.rect.height / 2;

  const modifier = isBelowOverItem ? 1 : 0;
  const newIndex = overIndex >= 0 ? overIndex + modifier : idArr.length + 1;

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

const hasChild = ['Row', 'Section', 'Box'];

const Builder = () => {
  const [activeItem, setActiveItem] = useState<any>(null);
  const [overItem, setOverItem] = useState<any>();
  const [activeNum, setActiveNum] = useState<number>(2);
  const [isBelow, setIsBelow] = useState<boolean | null>(null);
  const [rowChild, setRowChild] = useState<Block[]>([]);
  const [type, setType] = useState<string>();
  const [builder, setBuilder] = useState<BuilderComp>({
    blocks: [],
  });

  const changeActiveNum = (num: number) => setActiveNum(num);
  const { blocks } = builder;

  useEffect(() => {
    setRowChild(() => {
      const cols = optionsComp.Row.options.cols;
      const child = [];
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

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
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
          ? [...activeData.children] ?? []
          : hasChild.includes(activeData.type)
          ? activeData.type === 'Row'
            ? [...rowChild]
            : [
                {
                  id: uniqueId(),
                  type: 'Column',
                  options: {},
                  children: [],
                },
              ]
          : [],
    };

    if (over) {
      if (
        typeof over.id === 'number' ||
        (typeof active.id === typeof over.id && active.id === over.id) ||
        (activeChild && activeChild.includes(over.id))
      ) {
        return;
      }
      setIsBelow(null);
      setOverItem(undefined);
      setBuilder((prevBuilder) => ({
        blocks: addBuilder(prevBuilder.blocks, newComp, active, activeData, over),
      }));
    }
  };
  const handleDragStart = (e: DragStartEvent) => {
    const {
      data: { current: activeData },
    } = e.active;

    setActiveItem(activeData);
  };

  const handleDragMove = useCallback(({ active, over }: DragMoveEvent) => {
    if (!over) {
      return;
    }

    const {
      data: { current: overData },
    } = over;

    setOverItem(overData);

    const isBelowOverItem =
      typeof over.id === 'string'
        ? active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height / 2
        : null;

    setIsBelow(isBelowOverItem);
  }, []);

  const handleChildClick = (childType: string) => {
    setType(childType);
  };
  const handleChildClickOutSide = () => {
    setType('');
    setActiveItem(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
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
          headStyle={{
            height: 75,
          }}
          headerBordered
          onClick={handleChildClickOutSide}
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
            style={{
              maxHeight: '100%',
              overflow: 'auto',
            }}
            bodyStyle={{
              padding: 0,
            }}
          >
            {builder && blocks && blocks.length > 0 ? (
              blocks?.map((item) => {
                return (
                  <BuilderItem
                    key={item.id}
                    item={item}
                    active={activeItem}
                    overItem={overItem}
                    isBelow={isBelow}
                    onChildClick={handleChildClick}
                  />
                );
              })
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
            <BuilderOptions
              type={type ?? ''}
              activeNum={activeNum}
              changeActiveNum={changeActiveNum}
            />
          </ProCard>
        </ProCard>
      </SortableContext>
      <DragOverlay>
        {activeItem && activeItem.id ? (
          <Button
            icon={activeItem.icon}
            style={{
              zIndex: 9999,
            }}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Builder;

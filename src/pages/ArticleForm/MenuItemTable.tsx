/* eslint-disable react/jsx-key */
import type { Menu } from '@/services/ant-design-pro/api';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProFormItem,
  type ProFormItemProps,
  ProFormText,
} from '@ant-design/pro-components';
import type { DragEndEvent, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core';
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Form, Popconfirm, Space, Table, message } from 'antd';
import { uniqueId } from 'lodash';
import React, { useEffect, useState } from 'react';

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const findItem = (menu: Menu[], itemId: UniqueIdentifier): Menu | null => {
  let newMenuItem: Menu | null = null;

  for (const menuItem of menu) {
    if (menuItem.id === itemId) {
      newMenuItem = menuItem;
      break;
    } else {
      newMenuItem = findItem(menuItem.children ?? [], itemId);
      if (newMenuItem) {
        break;
      }
    }
  }

  return newMenuItem;
};

const filterItem = (menu: Menu[], activeId: UniqueIdentifier, overId: UniqueIdentifier) => {
  let newMenu: Menu[] = [];

  if (activeId === overId) {
    newMenu = menu;
    return newMenu;
  }

  for (const menuItem of menu) {
    if (menuItem.id === activeId) {
      newMenu.push();
    } else {
      newMenu.push(
        menuItem.children
          ? {
              ...menuItem,
              children: filterItem(menuItem.children ?? [], activeId, overId),
            }
          : menuItem,
      );
    }
  }

  return newMenu;
};

const MenuItemTable: React.FC<{
  value?: any;
  onChange?: (value: any) => void;
}> = ({ value, onChange }) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly React.Key[]>([]);
  const [dataSource, setDataSource] = useState<Menu[]>([]);
  const [rowId, setRowId] = useState<string[]>([]);
  const [isGrappng, setIsGrapping] = useState<boolean>(false);
  const [form] = Form.useForm();

  const Row = (props: RowProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
      id: props['data-row-key'],
    });

    const dndKitRowStyle: React.CSSProperties = {
      ...props.style,
      transform: CSS.Translate.toString(transform && { ...transform, scaleY: 1 }),
      transition,
      ...(isDragging ? { position: 'relative', zIndex: 999 } : {}),
      cursor: isGrappng ? 'grabbing' : 'grab',
    };

    return (
      <tr
        {...props}
        {...attributes}
        {...listeners}
        ref={setNodeRef}
        style={dndKitRowStyle}
        onFocus={() => setIsGrapping(true)}
      />
    );
  };

  useEffect(() => {
    setDataSource(value);

    return () => setDataSource([]);
  }, [value]);

  useEffect(() => {
    const getSortIdArr = (menu: Menu[]) => {
      if (!menu) {
        return;
      }

      for (const item of menu) {
        setRowId((prevRowId: string[]) => [...prevRowId, item?.id]);

        if (item.children) {
          getSortIdArr(item.children);
        }
      }
    };

    getSortIdArr(dataSource);

    return () => setRowId([]);
  }, [dataSource]);

  const filterMenu = [
    {
      text: 'Has Child',
      value: true,
    },
    {
      text: 'No Child',
      value: false,
    },
  ];

  const handleAddMenu = async (formData: Menu) => {
    onChange?.([
      ...(value ?? []),
      {
        ...formData,
        id: uniqueId(),
        children: [],
      },
    ]);

    return true;
  };

  const handleEditMenu = async (formData: Menu) => {
    const editChild = (menu: Menu[]) => {
      if (!menu) {
        return;
      }

      const newMenu: Menu[] = menu.map((item: Menu) => {
        if (item.id === formData.id) {
          return {
            ...item,
            ...formData,
          };
        } else {
          if (item.children) {
            return {
              ...item,
              children: editChild(item.children ?? []),
            };
          } else {
            return {
              ...item,
            };
          }
        }
      });

      return newMenu;
    };

    onChange?.(editChild(value));

    return true;
  };

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

  const handleDragEnd = ({ active, over, delta }: DragEndEvent) => {
    setIsGrapping(false);

    if (!active || !over) return;

    const activeItemDrag = findItem(dataSource, active.id);
    const overItemDrag = findItem(dataSource, over.id);
    const newFilterMenu = filterItem(dataSource, active.id, over.id);

    const moveItem = (menu: Menu[], activeItem: Menu, overItem: Menu) => {
      const newMenu: Menu[] = [];

      for (const menuItem of menu) {
        if (menuItem.id === overItem.id && activeItem.id !== overItem.id) {
          const isExpand = expandedRowKeys.includes(menuItem.id);

          if (delta.y >= 0 && isExpand) {
            newMenu.push({
              ...menuItem,
              children: [activeItem, ...(menuItem.children ?? [])],
            });
          } else {
            newMenu.push(
              delta.y >= 0 ? menuItem : activeItem,
              delta.y >= 0 ? activeItem : menuItem,
            );
          }
        } else {
          newMenu.push(
            menuItem.children
              ? {
                  ...menuItem,
                  children: moveItem(menuItem.children, activeItem, overItem),
                }
              : menuItem,
          );
        }
      }

      return newMenu;
    };

    if (activeItemDrag && overItemDrag) {
      onChange?.(moveItem(newFilterMenu, activeItemDrag, overItemDrag));
    }
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    setExpandedRowKeys(expandedRowKeys.filter((item: React.Key) => item !== active.id));
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      filters: filterMenu,
      onFilter: (isParent: any, record: any) => {
        return !!record.children === isParent;
      },
      showSorterTooltip: false,
    },
    { title: 'Path', dataIndex: 'path' },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_: any, record: any) => [
        <Space>
          <Button
            type="primary"
            onClick={() => {
              setExpandedRowKeys((prevKey: readonly React.Key[]) => [...prevKey, record.id]);
              const addChildren = (menu: Menu[]) => {
                if (!menu) {
                  return;
                }
                const newMenu: Menu[] = menu.map((item: Menu) =>
                  item.id === record.id
                    ? {
                        ...item,
                        children: [
                          ...(item.children ?? []),
                          {
                            id: uniqueId(),
                            name: `child ${uniqueId()}`,
                            path: 'child',
                            parentId: item.id,
                            children: [],
                          },
                        ],
                      }
                    : item.children
                    ? {
                        ...item,
                        children: addChildren(item.children ?? []),
                      }
                    : item,
                );

                return newMenu;
              };

              onChange?.(addChildren(value));
            }}
            icon={<PlusOutlined />}
          />

          <ModalForm
            title="Edit menu"
            initialValues={record}
            onFinish={handleEditMenu}
            trigger={<Button type="primary" ghost icon={<EditOutlined />} />}
          >
            <ProFormText name="id" hidden />
            <ProFormText
              rules={[
                {
                  required: true,
                },
              ]}
              name="name"
              label="Name"
              placeholder="Please input"
            />
            <ProFormText
              rules={[
                {
                  required: true,
                },
              ]}
              name="path"
              label="Path"
              placeholder="Please input"
            />
          </ModalForm>

          <Popconfirm
            title="Are you sure to delete this menu?"
            onConfirm={() => {
              const removeChild = (menu: Menu[]) => {
                if (!menu) {
                  return;
                }

                const newMenu: Menu[] = [];

                for (const menuItem of menu) {
                  if (menuItem.id === record.id) {
                    newMenu.push(...(menuItem.children ?? []));
                  } else {
                    newMenu.push(
                      menuItem.children
                        ? {
                            ...menuItem,
                            children: removeChild(menuItem.children),
                          }
                        : menuItem,
                    );
                  }
                }

                return newMenu;
              };

              onChange?.(removeChild(value));
              message.success('Delete successful!');
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>,
      ],
    },
  ];

  return (
    <>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <SortableContext items={rowId} strategy={verticalListSortingStrategy}>
          <Table
            components={{
              body: {
                row: Row,
              },
            }}
            rowKey="id"
            expandable={{
              expandedRowKeys: expandedRowKeys,
              onExpandedRowsChange: (expandedKeys) => {
                setExpandedRowKeys(expandedKeys);
              },
            }}
            columns={columns}
            dataSource={dataSource}
            pagination={false}
          />
        </SortableContext>
      </DndContext>
      <ModalForm
        title="Add menu"
        onFinish={handleAddMenu}
        form={form}
        trigger={
          <Button block type="dashed" style={{ marginTop: 16 }} onClick={() => form.resetFields()}>
            Add menu
          </Button>
        }
      >
        <ProFormText
          rules={[
            {
              required: true,
            },
          ]}
          name="name"
          label="Name"
          placeholder="Please input"
        />
        <ProFormText
          rules={[
            {
              required: true,
            },
          ]}
          name="path"
          label="Path"
          placeholder="Please input"
        />
      </ModalForm>
    </>
  );
};

const MenuItemFormItem: React.FC<ProFormItemProps> = (props) => {
  return (
    <ProFormItem {...props}>
      <MenuItemTable />
    </ProFormItem>
  );
};

export default MenuItemFormItem;

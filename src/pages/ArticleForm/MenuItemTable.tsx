import { Menu } from '@/services/ant-design-pro/api';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormItem, ProFormItemProps, ProFormText } from '@ant-design/pro-components';
import type {
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier,
} from '@dnd-kit/core';
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Form, Popconfirm, Space, Table, message } from 'antd';
import { uniqueId } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const MenuItemTable: React.FC<{
  value?: any;
  onChange?: (value: any) => void;
}> = ({ value, onChange }) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly React.Key[]>([]);
  const [dataSource, setDataSource] = useState<Menu[]>([]);
  const [overId, setOverId] = useState<UniqueIdentifier>();
  const [activeId, setActiveId] = useState<UniqueIdentifier>();
  const [rowId, setRowId] = useState<string[]>([]);
  const [offsetLeft, setOffsetLeft] = useState<number>(0);
  const [isGrappng, setIsGrapping] = useState<boolean>(false);
  const [form] = Form.useForm();

  // console.log('render');

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
      // opacity: isDragging ? 0.5 : undefined,
    };

    return (
      <tr
        {...props}
        ref={setNodeRef}
        style={dndKitRowStyle}
        {...attributes}
        {...listeners}
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

  const findItem = (menu: Menu[], itemId: UniqueIdentifier): Menu | null => {
    // debugger;
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

  const findIndex = (menu: Menu[], overId: UniqueIdentifier) => {
    let index = -1;

    for (const menuItem of menu) {
      if (menuItem.id === overId) {
        index = menu.findIndex((item: Menu) => item.id === overId);
        break;
      } else {
        index = findIndex(menuItem.children ?? [], overId);

        if (index !== -1) {
          break;
        }
      }
    }

    return index;
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

  const handleDragEnd = ({ active, over, delta }: DragEndEvent) => {
    setIsGrapping(false);

    if (!active || !over) return;

    const activeItem = findItem(dataSource, active.id);
    const overItem = findItem(dataSource, over.id);
    const newMenu = filterItem(dataSource, active.id, over.id);
    const activeIndex = findIndex(dataSource, active.id);

    const moveItem = (menu: Menu[], activeItem: Menu, overItem: Menu) => {
      let newMenu: Menu[] = [];
      let prevActiveItem: Menu;

      for (const menuItem of menu) {
        if (menuItem.id === activeItem.id && activeItem.id === overItem.id) {
          prevActiveItem = menu[activeIndex - 1];

          if (delta.x >= 50 && prevActiveItem && expandedRowKeys.includes(prevActiveItem.id)) {
            newMenu = menu
              .filter(
                (item: Menu) =>
                  prevActiveItem && item.id !== prevActiveItem.id && item.id !== menuItem.id,
              )
              .map((item: Menu) =>
                item.id === prevActiveItem.id && item.children
                  ? {
                      ...prevActiveItem,
                      children: [...(prevActiveItem.children ?? []), activeItem],
                    }
                  : prevActiveItem,
              );
            console.log(newMenu);
          }
        }

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

    if (activeItem && overItem) {
      onChange?.(moveItem(newMenu, activeItem, overItem));
    }
  };

  const handleDragOver = useCallback(() => {
    ({ over }: DragOverEvent) => {
      setOverId(over?.id);
    };
  }, []);

  const handleDragMove = useCallback(() => {
    ({ delta }: DragMoveEvent) => {
      console.log(delta.x);
      setOffsetLeft(delta.x);
    };
  }, [setOffsetLeft]);

  const handleDragStart = ({ active }: DragStartEvent) => {
    setExpandedRowKeys(expandedRowKeys.filter((item: React.Key) => item !== active.id));
    setActiveId(active.id);
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragMove={handleDragMove}
        onDragStart={handleDragStart}
      >
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
            columns={[
              {
                title: 'Name',
                dataIndex: 'name',
                filters: filterMenu,
                onFilter: (isParent, record) => {
                  return !!record.children === isParent;
                },
                showSorterTooltip: false,
              },
              { title: 'Path', dataIndex: 'path' },
              {
                title: 'Action',
                dataIndex: 'action',
                render: (_, record) => [
                  <Space>
                    <Button
                      type="primary"
                      onClick={() => {
                        setExpandedRowKeys((prevKey: readonly React.Key[]) => [
                          ...prevKey,
                          record.id,
                        ]);
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
                              : {
                                  ...item,
                                },
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

                          let newMenu: Menu[] = [];

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
            ]}
            dataSource={dataSource}
            pagination={false}
          />
          {/* <DragOverlay>{activeId ? 'Drag' : null}</DragOverlay> */}
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

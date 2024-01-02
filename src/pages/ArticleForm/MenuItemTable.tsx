import { Menu } from '@/services/ant-design-pro/api';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormItem, ProFormItemProps, ProFormText } from '@ant-design/pro-components';
import { Button, Table } from 'antd';
import { uniqueId } from 'lodash';
import React, { useState } from 'react';

type FormData = {
  name: string;
  path: string;
};

const MenuItemTable: React.FC<{
  value?: any;
  onChange?: (value: any) => void;
}> = ({ value, onChange }) => {
  const id = uniqueId();
  const [initData, setInitData] = useState([]);
  const handleAddMenu = async (formData: FormData) => {
    onChange?.([
      ...(value ?? []),
      {
        ...formData,
        id,
        children: [],
      },
    ]);

    return true;
  };

  return (
    <div>
      <Table
        rowKey="id"
        rowSelection={{}}
        dataSource={value}
        columns={[
          { title: 'name', dataIndex: 'name' },
          { title: 'path', dataIndex: 'path' },
          {
            render: (_, record) => [
              <Button
                type="link"
                onClick={() => {
                  const addChildren = (menu: Menu[]) => {
                    if (!menu) {
                      return;
                    }

                    const newMenu: Menu[] = menu.map((item: any) =>
                      item.id === record.id
                        ? {
                            ...item,
                            children: [
                              ...(item.children ?? []),
                              {
                                id,
                                name: `child ${id}`,
                                path: 'child',
                                children: [],
                              },
                            ],
                          }
                        : {
                            ...item,
                            children: addChildren(item.children),
                          },
                    );

                    return newMenu;
                  };

                  onChange?.(addChildren(value));
                }}
                icon={<PlusOutlined />}
              />,
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => {
                  const editChild = (menu: Menu[]) => {
                    if (!menu) {
                      return;
                    }

                    const newMenu: Menu[] = menu.map((item: Menu) => {
                      if (item.id === record.id) {
                        return {
                          ...item,
                          name: 'Child updated',
                        };
                      } else {
                        return {
                          ...item,
                          children: editChild(item.children ?? []),
                        };
                      }
                    });

                    return newMenu;
                  };

                  onChange?.(editChild(value));
                }}
              />,
              <Button
                type="link"
                onClick={() => {
                  const removeChild = (menu: Menu[]) => {
                    if (!menu) {
                      return;
                    }

                    let newMenu;

                    newMenu = menu.filter((item: Menu) => {
                      if (item.id === record.id) {
                        return item.id !== record.id;
                      } else {
                        item.children = removeChild(item.children ?? []);
                        return true;
                      }
                    });

                    return newMenu;
                  };
                  onChange?.(removeChild(value));
                }}
                icon={<DeleteOutlined />}
              />,
            ],
          },
        ]}
        pagination={false}
      />
      <ModalForm
        title="Add menu"
        onFinish={handleAddMenu}
        trigger={
          <Button block type="dashed" style={{ marginTop: 16 }}>
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
    </div>
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

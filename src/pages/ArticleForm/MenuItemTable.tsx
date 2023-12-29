import { Menu } from '@/services/ant-design-pro/api';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormItem, ProFormItemProps, ProFormText } from '@ant-design/pro-components';
import { Button, Table } from 'antd';
import { uniqueId } from 'lodash';
import React from 'react';

type FormData = {
  name: string;
  path: string;
};

const MenuItemTable: React.FC<{
  value?: any;
  onChange?: (value: any) => void;
}> = ({ value, onChange }) => {
  const id = uniqueId();
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
                    // menu.map((item: Menu) => {
                    //   if (item.id === record.id) {
                    const old = menu.map((item: any) =>
                      item.id === record.id
                        ? {
                            ...item,
                            children: [
                              ...item.children,
                              {
                                id,
                                name: `child ${uniqueId()}`,
                                path: 'child',
                                children: [],
                              },
                            ],
                          }
                        : addChildren(item.children),
                    );
                    console.log(old);
                  };

                  //   if (item.children) {
                  //     addChildren(item.children);
                  //   }
                  // });

                  //   return menu;
                  // };

                  onChange?.(addChildren(value));
                  // const map = (item) => {
                  //   if (item.id === record.id) {
                  //     return {
                  //       ...item,
                  //       children: [
                  //         ...item.children,
                  //         {
                  //           id: uniqueId(),
                  //           children: [],
                  //         },
                  //       ],
                  //     };
                  //   } else {
                  //     return {
                  //       ...item,
                  //       children: item.children.map(map),
                  //     };
                  //   }
                  // };

                  // onChange?.(value.map(map));
                }}
                icon={<PlusOutlined />}
              />,
              <Button type="link" icon={<EditOutlined />} />,
              <Button
                type="link"
                onClick={() => {
                  console.log(record);
                  onChange?.(value.filter((item: Menu) => item.id !== record.id));
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

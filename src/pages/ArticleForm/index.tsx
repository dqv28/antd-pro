import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  EditableFormInstance,
  EditableProTable,
  ModalForm,
  ProForm,
  ProFormText,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import { set, uniqueId } from 'lodash';
import { useRef, useState } from 'react';

type FormData = {
  id: number;
  name: string;
  path: string;
};

export type TableListItem = {
  key: number;
  [key: string]: any;
};

const ArticleForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tableRef = useRef<ActionType>();
  const editableRef = useRef<EditableFormInstance>();
  let count = 1;
  const [level, setLevel] = useState<number[]>([count]);

  const handleAddMenu = async (formData: FormData) => {
    const id = uniqueId();
    tableRef.current?.addEditRecord?.({
      ...formData,
      id,
      children: [],
    });
    tableRef.current?.cancelEditable(id);

    return true;
  };

  const handleSubmit = async (form: any) => {
    console.log('Form', form);
  };

  var menu = [
    {
      name: 'item 1',
      children: [
        {
          name: 'item 2',
          children: [
            {
              name: 'item 3',
            },
          ],
        },
      ],
    },
    {
      name: 'item 4',
    },
    {
      name: 'item 5',
      children: [
        {
          name: 'item 6',
        },
      ],
    },
  ];

  return (
    <>
      <ProForm
        title="Add menu"
        onFinish={handleSubmit}
        style={{ backgroundColor: '#fff', padding: '16px 24px' }}
      >
        <ProFormText
          name="name"
          label="Name"
          placeholder="name"
          rules={[{ required: true, message: 'This rule is required' }]}
        />
        <ProFormText name="company" label="Company" placeholder="company" />

        <EditableProTable
          size="large"
          rowKey="id"
          name="menu"
          cardProps={{
            bodyStyle: {
              padding: 0,
            },
          }}
          actionRef={tableRef}
          editableFormRef={editableRef}
          recordCreatorProps={false}
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
            },
            {
              title: 'Path',
              dataIndex: 'path',
            },

            {
              title: 'Option',
              valueType: 'option',
              render: (_, record, index, action) => [
                <Button
                  onClick={() => {
                    const data = editableRef.current?.getRowData?.(
                      record.parentId ? record.parentId : record.id,
                    );

                    const newChild = {
                      id: uniqueId(),
                      parentId: data.id,
                      name: `Child `,
                      path: `child`,
                      children: [],
                    };
                    const addChildren = (menu: any, level: number) => {
                      if (level > 0) {
                        menu.children?.push(newChild);

                        if (menu.parentId) {
                          addChildren(menu.children, (level -= 1));
                          console.log(menu);
                        }

                        return menu;
                      }
                    };

                    const newData = addChildren(data, 2);

                    setLevel((prevLevel) => [...prevLevel, count]);
                    editableRef?.current?.setRowData?.(data.id, newData);
                  }}
                  type="primary"
                  icon={<PlusOutlined />}
                />,
                <Button
                  onClick={() => setIsModalOpen(true)}
                  type="primary"
                  icon={<EditOutlined />}
                  ghost
                />,
                <Button
                  onClick={() => {
                    const data = editableRef.current?.getRowData?.(
                      record.parentId ? record.parentId : record.id,
                    );
                    editableRef.current?.setRowData?.(data.id, {
                      children: record.parentId
                        ? data.children.filter((item: any) => item.id !== record.id)
                        : [],
                    });
                  }}
                  type="primary"
                  icon={<DeleteOutlined />}
                  danger
                />,
              ],
            },
          ]}
        />
        <ModalForm
          title="Add menu"
          onFinish={handleAddMenu}
          trigger={<Button type="dashed">Add menu</Button>}
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
      </ProForm>
    </>
  );
};

export default ArticleForm;

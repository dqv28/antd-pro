import { ProForm, ProFormText } from '@ant-design/pro-components';
import MenuItemFormItem from './MenuItemTable';
import React from 'react';

export type TableListItem = {
  key: number;
  [key: string]: any;
};

const items = [
  {
    id: '10',
    name: 'menu',
    path: 'menu',
    children: [
      {
        id: '12',
        name: 'child',
        path: 'child',
        parentId: '10',
        children: [
          {
            id: '17',
            name: 'child 4',
            path: 'child4',
            parentId: '12',
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: '13',
    name: 'menu 2',
    path: 'menu2',
    children: [],
  },
  {
    id: '14',
    name: 'menu 3',
    path: 'menu3',
    children: [
      {
        id: '15',
        name: 'child 2',
        path: 'child2',
        parentId: '14',
        children: [
          {
            id: '16',
            name: 'child 3',
            path: 'child3',
            parentId: '15',
            children: [],
          },
        ],
      },
    ],
  },
];

const ArticleForm: React.FC = () => {
  const handleSubmit = async (form: any) => {
    console.log('Form', form);
  };

  return (
    <>
      <ProForm
        title="Add menu"
        onFinish={handleSubmit}
        style={{ backgroundColor: '#fff', padding: '16px 24px' }}
        initialValues={{
          items,
        }}
      >
        <ProFormText
          name="name"
          label="Name"
          placeholder="Please input"
          rules={[{ required: true, message: 'This rule is required' }]}
        />
        <ProFormText name="company" label="Company" placeholder="Please input" />
        <MenuItemFormItem name="items" />
      </ProForm>
    </>
  );
};

export default ArticleForm;

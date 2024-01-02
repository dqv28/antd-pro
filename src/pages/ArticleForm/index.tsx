import { ProForm, ProFormText } from '@ant-design/pro-components';
import MenuItemFormItem from './MenuItemTable';
import React from 'react';

export type TableListItem = {
  key: number;
  [key: string]: any;
};

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
        // initialValues={{
        //   items: [
        //     {
        //       id: 1,
        //       name: 'menu',
        //       path: 'menu',
        //       children: [
        //         {
        //           id: 2,
        //           name: 'child',
        //           path: 'child',
        //           children: [],
        //         },
        //       ],
        //     },
        //     {
        //       id: 3,
        //       name: 'menu 2',
        //       path: 'menu2',
        //       children: [],
        //     },
        //     {
        //       id: 4,
        //       name: 'menu 3',
        //       path: 'menu3',
        //       children: [
        //         {
        //           id: 5,
        //           name: 'child 2',
        //           path: 'child2',
        //           children: [
        //             {
        //               id: 6,
        //               name: 'child 3',
        //               path: 'child3',
        //               children: [],
        //             },
        //           ],
        //         },
        //       ],
        //     },
        //   ],
        // }}
      >
        <ProFormText
          name="name"
          label="Name"
          placeholder="name"
          rules={[{ required: true, message: 'This rule is required' }]}
        />
        <ProFormText name="company" label="Company" placeholder="company" />
        <MenuItemFormItem name="items" />
      </ProForm>
    </>
  );
};

export default ArticleForm;
